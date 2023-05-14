import { Container, Heading } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import AWS from 'aws-sdk';
import CreatePost from "./components/CreatePost";
import SearchPost from "./components/SearchPost";
import PostsCatalogue from "./components/PostsCatalogue";
import axios from 'axios';


const FeedPage = () => {
  const [postData, setPostData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [myArray, setMyArray] = useState([]);
  AWS.config.update({
    accessKeyId: 'AKIA4W7FFVFRKSJIONJW',
    secretAccessKey: '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',
    region: 'us-east-1'
  });

  var dynamodb = new AWS.DynamoDB.DocumentClient();

  const cognito = new AWS.CognitoIdentityServiceProvider({
    region: 'us-east-1',
  });
  const getUserEmail = async (userId) => {
    const params = {
      UserPoolId: 'us-east-1_X8C0ZSbez',
      Username: userId,
    };

    return new Promise((resolve, reject) => {
      cognito.adminGetUser(params, (err, data) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          const email = data.UserAttributes.find(attr => attr.Name === 'email').Value
          console.log(userId, email)
          resolve(email);
        }
      });
    });
  };


  useEffect(() => {

    const params = {
      TableName: 'doconnect-posts',
    };
    dynamodb.scan(params, async (err, data) => {
      if (err) {
        console.error(err);
        setLoading(false);
      } else {
        var transformedRecords = await Promise.all(data.Items.map(async (item) => {
          return {
            email: await getUserEmail(item.userid),
            content: item.postcontent,
            postid:item.postid,
            images: item.imagekey.split(',').map(key => `https://feedpostimages.s3.amazonaws.com/${key}`),
            createdAtTimeStamp: new Date(item.createdAtTimeStamp * 1000).toLocaleString()
          };
        }));
        console.log("Myarray",myArray)
        if(myArray.length > 0){
          transformedRecords = transformedRecords
            .filter(record => myArray.includes(record.postid))
            .map(({ postid, ...rest }) => rest);
        }
        else {
          transformedRecords = transformedRecords.map(({ postid, ...rest }) => rest);
        }
        
        const sortedRecords = transformedRecords.sort((a, b) => {
          const timestampA = new Date(a.createdAtTimeStamp).getTime();
          const timestampB = new Date(b.createdAtTimeStamp).getTime();
          return timestampB - timestampA;
        });

        console.log(sortedRecords)
        setPostData(sortedRecords);

        setLoading(false);
      }
    });


  }, [dynamodb, myArray]);

  const handlePostCreated = () => {
    dynamodb = new AWS.DynamoDB.DocumentClient();
  }

  const handleSearchClicked = (searchterm) => {
    dynamodb = new AWS.DynamoDB.DocumentClient();
    console.log("Search clicked with:", searchterm)
    const username = 'cloudprojmaster';
    const password = 'Doconnect123@';
    const axiosInstance = axios.create({
      baseURL: 'https://search-doconnect-posts-domain-22hrxxgqibw6ee47eu2impl67m.us-east-1.es.amazonaws.com',
      auth: {
        username,
        password
      }
    });
    console.log("axios instance", axiosInstance)
    axiosInstance.get('/posts/_search', {
      params: {
        q: searchterm
      }
    })
      .then(response => {
        const searchData = response.data;
        console.log("searchData", searchData);
        const fetchedPosts = searchData['hits']['hits']
        console.log("fetchedPosts", fetchedPosts);
        console.log("0th", fetchedPosts[0]["_source"]);
        for (var i = 0; i < fetchedPosts.length; i++) {
          const newitem = fetchedPosts[i]["_source"]['postid']
          setMyArray(prevArray => [...prevArray, newitem]);
        }


        console.log("list of postids", myArray);

      })
      .catch(error => {
        console.error('Error fetching data from Elasticsearch:', error);
      });
  }

  return (
    <Container my={10} variant="responsive">
      <SearchPost onPostCreated={handleSearchClicked} />
      <CreatePost onPostCreated={handlePostCreated} />
      <Heading textAlign="center" variant="h2" fontWeight="bold">
        Your Feed
      </Heading>
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <PostsCatalogue posts={postData} />
        )}
      </div>
    </Container>
  );
};

export default FeedPage;
