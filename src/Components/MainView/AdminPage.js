import React from 'react'
import axios from 'axios';


function AdminPage() {
    const getAccessToken = () => {
        axios.delete(`http://192.168.0.202:5052/logouts`)
        .then(response => {
            if (response.status === 204)
                console.log(response.data); // 서버로부터의 응답 처리
            else if (response.status === 401)
            {
                //get accesstoken
            }
            
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
    }

  return (
    <div>
      <button onClick={getAccessToken}>accesstoken가져오기</button>
    </div>
  )
}

export default AdminPage