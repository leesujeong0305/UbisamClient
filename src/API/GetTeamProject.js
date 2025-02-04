import Axios from './AxiosApi';

export const  GetTeamProject = async (authUserTeam) => {
    const ip = process.env.REACT_APP_API_DEV === "true" ? `http://localhost:8877` : `http://14.58.108.70:8877`;
    //const ip = `http://localhost:8877`;
    console.log('GetTeamProject', authUserTeam);
    
        return Axios.get(`${ip}/GetTeamProject?Site=${encodeURIComponent(authUserTeam)}`, { //get은 body없음
            headers: {
                "Content-Type": "application/json",
            }
        }).then((res) => {
            if (res.data) {
                const data = res.data;
                //const reversedData = data.reverse();
                
                const mainData = data.filter(item => item.Status !== 5 && item.Status !== 6);
                const tailData = data.filter(item => item.Status === 5 || item.Status === 6);

                const sortedData = [...mainData, ...tailData];
                return sortedData;
            } else if (res.data.code === 403) { //에러메세지 로그 없이 처리하려할때
                console.log("403");
            }
        }).catch(error => {
            console.log({ error });
            // if (error.response.status === 403) {
            //     alert(`${error.response.data.message}`);
            // }
        });

}

export const  ExistTeamProject = async (authUserTeam, currentYear) => {
    const ip = process.env.REACT_APP_API_DEV === "true" ? `http://localhost:8877` : `http://14.58.108.70:8877`;
    //const ip = `http://localhost:8877`;
    console.log('GetTeamProject', authUserTeam, currentYear);
    
        return Axios.get(`${ip}/existTeamProject?Site=${encodeURIComponent(authUserTeam)}&Year=${currentYear}`, { //get은 body없음
            headers: {
                "Content-Type": "application/json",
            }
        }).then((res) => {
            if (res.data) {
                const data = res.data;
                //const reversedData = data.reverse();
                return data;
            } else if (res.data.code === 403) { //에러메세지 로그 없이 처리하려할때
                console.log("403");
            }
        }).catch(error => {
            console.log({ error });
            // if (error.response.status === 403) {
            //     alert(`${error.response.data.message}`);
            // }
        });

}