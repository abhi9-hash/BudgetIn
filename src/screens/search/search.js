import React from "react";
import { useSelector } from "react-redux";
import { Layout, Table, Typography, Space } from "antd";
import { useNavigate } from "react-router-dom";
import LoadingBox from "../../components/loadingBox";
import Navbar from "../../components/navbar";
import ErrorBox from "../../components/errorBox";

const { Content } = Layout;
const { Title } = Typography;

export default function Search() {
  const navigate = useNavigate();

  const { loading, error, workspaces } = useSelector(
    (state) => state.workspaceList
  );

  const handleRowClick = (id) => {
    navigate(`/workspace/${id}`);
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Name", dataIndex: "name", key: "name" },
    {
      title: "Creator Email",
      dataIndex: "creator email",
      key: "creator_email",
    },
    {
      title: "# Active Users",
      dataIndex: "# Active Users",
      key: "Active_Users",
    },
    {
      title: "# Total Users",
      dataIndex: "# Total Users",
      key: "Total_Users",
    },
  ];

  return (
    <Layout>
      <Navbar />
      <Content>
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <ErrorBox message={error} />
        ) : (
          <Space direction="vertical" size="large" className="w-full p-20">
            <Title level={2} align="center">
              Workspaces
            </Title>
            <Table
              columns={columns}
              dataSource={workspaces}
              onRow={(record) => {
                return {
                  onClick: () => handleRowClick(record.id),
                };
              }}
              pagination={{ pageSize: 5 }}
              className="cursor-pointer"
            />
          </Space>
        )}
      </Content>
    </Layout>
  );
}
