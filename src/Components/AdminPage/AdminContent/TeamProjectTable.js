import React, { useEffect, useState } from 'react';
import AdminTeamBulletin from './TeamProjectTable/AdminTeamBulletin'
import TeamProjectBoard from './TeamProjectTable/TeamProjectBoard';
import GetTeamProject from '../../../API/GetTeamProject';
import { useSelector } from 'react-redux';

const TeamProjectTable = () => {
  const { authUserId, authUserName, authUserRank, authUserTeam, authManager } = useSelector((state) => state.userInfo);
  const [loadData, setLoadData] = useState([]);

  const Continents = [
    { key: '자동화1팀', value: '파주' },
    { key: '시스템사업팀', value: '구미' },
  ];

  const selectSite = () => {
    if (authUserTeam === undefined) return;
    const found = Continents.find((item) => item.key === authUserTeam);
    return found ? found.value : undefined;
  };
    const data = [
        {
          index: 1,
          ProjectName: "P8 ~ P8E ADR+ Development",
          Date: "2024-01-08",
          Part: 1,
          Status: "Setup",
          Manager: 'PRI 홍길동 연구원',
          Users: "김철수, 이수정, 홍길동",
          StartMonth: 1,
          EndMonth: 3,
          Months: 2, // 진행률 바가 표시될 개월 수
          Progress: 80, // 진행률 백분율
          ProopsMM: 1.2,
          Cost: 1,
          Desc: "2021년 3분기에 청구 예정"
        },
        {
          index: 2,
          ProjectName: "AP4 MTO setup and ADJ development",
          Date: "2024-01-22",
          Part: 1,
          Status: "Production Setup",
          Manager: '김철수',
          Users: "김철수, 홍길동",
          StartMonth: 1,
          EndMonth: 10,
          Months: 8, // 진행률 바가 표시될 개월 수
          ProopsMM: 1.2,
          Post: 2,
          Crogress: 80, // 진행률 백분율
          Desc: ""
        },
        {
          index: 3,
          ProjectName: "XYZ Project Phase 1",
          Date: "2024-09-14",
          Part: 2,
          Status: "Initiation",
          Manager: '홍길동',
          Users: "김철수, 이수정, 홍길동, 아무개",
          StartMonth: 9,
          EndMonth: 11,
          Months: 2, // 진행률 바가 표시될 개월 수
          Progress: 60, // 진행률 백분율
          ProopsMM: 1.2,
          Cost: 2,
          Desc: "승인 대기 중"
        },
        {
          index: 4,
          ProjectName: "Alpha Beta Gamma Integration",
          Date: "2024-03-03",
          Part: 3,
          Status: "Development",
          Manager: '김철수',
          Users: "아무개",
          StartMonth: 3,
          EndMonth: 6,
          Months: 1.5, // 진행률 바가 표시될 개월 수
          Progress: 50, // 진행률 백분율
          ProopsMM: 1.2,
          Cost: 1,
          Desc: "모듈 B에서 기술적 문제 발생"
        },
        {
          index: 5,
          ProjectName: "Data Migration for XYZ Corp",
          Date: "2024-01-01",
          Part: 1,
          Status: "Planning",
          Manager: '홍길동',
          Users: "이수정, 홍길동",
          StartMonth: 1,
          EndMonth: 5,
          Months: 4, // 진행률 바가 표시될 개월 수
          Progress: 30, // 진행률 백분율
          ProopsMM: 1.2,
          Cost: 2,
          Desc: "자원 할당 필요"
        },
        {
          index: 6,
          ProjectName: "Mobile App Launch",
          Date: "2024-01-10",
          Part: 2,
          State: "Testing",
          Manager: '김철수',
          Users: "김철수, 홍길동, 아무개",
          StartMonth: 1,
          EndMonth: 7,
          Months: 6, // 진행률 바가 표시될 개월 수
          Progress: 90, // 진행률 백분율
          ProopsMM: 1.2,
          Cost: 1,
          Desc: "버그 수정 진행 중"
        },
        {
          index: 7,
          ProjectName: "Cloud Infrastructure Setup",
          Date: "2024-01-15",
          Part: 3,
          Status: "Deployment",
          Manager: '홍길동',
          Users: "이수정, 홍길동",
          StartMonth: 1,
          EndMonth: 8,
          Months: 6, // 진행률 바가 표시될 개월 수
          Progress: 75, // 진행률 백분율
          ProopsMM: 1.2,
          Cost: 3,
          Desc: "보안 검토 대기 중"
        },
        {
          index: 8,
          ProjectName: "2023 year test",
          Date: "2023-02-15",
          Part: 3,
          Status: "Deployment",
          Manager: '김철수',
          Users: "김철수",
          StartMonth: 1,
          EndMonth: 7,
          Months: 6, // 진행률 바가 표시될 개월 수
          Progress: 75, // 진행률 백분율
          ProopsMM: 1.2,
          Cost: 2,
          Desc: "보안 검토 대기 중"
        },
        {
          index: 9,
          ProjectName: "2023 year test2",
          Date: "2023-01-15",
          Part: 3,
          Status: "Deployment",
          Manager: '홍길동',
          Users: "김철수, 이수정, 홍길동, 아무개",
          StartMonth: 3,
          EndMonth: 6,
          Months: 2, // 진행률 바가 표시될 개월 수
          Progress: 75, // 진행률 백분율
          ProopsMM: 1.2,
          Cost: 2,
          Desc: "보안 검토 대기 중"
        },
        {
          index: 10,
          ProjectName: "2023 year Test3",
          Date: "2023-09-20",
          Part: 3,
          Status: "Deployment",
          Manager: '김철수',
          Users: "김철수, 이수정, 홍길동, 아무개",
          StartMonth: 6,
          EndMonth: 12,
          Months: 4, // 진행률 바가 표시될 개월 수
          Progress: 75, // 진행률 백분율
          ProopsMM: 1.2,
          Cost: 3,
          Desc: "보안 검토 대기 중"
        }
      ];

      useEffect(() => {
        const LoadTimeProject = async () => {
          const site = selectSite();
          const data = await GetTeamProject(site);
          setLoadData(data);
        };
        LoadTimeProject();
      }, []);
  return (
    <div>
        <TeamProjectBoard posts={loadData} />
    </div>
  );
};

export default TeamProjectTable;