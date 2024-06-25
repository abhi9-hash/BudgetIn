import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { workspaceDetails } from "../../components/actions/workspaceActions";
import { Layout, Table, Typography, Space, Row, Col, Card } from "antd";
import LoadingBox from "../../components/loadingBox";
import Navbar from "../../components/navbar";
import ErrorBox from "../../components/errorBox";

const { Content } = Layout;
const { Title } = Typography;

const Details = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(workspaceDetails(id));
  }, [dispatch, id]);

  const {
    loading,
    error,
    workspace = [],
  } = useSelector((state) => state.workspaceDetails);

  const userColumns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Role ID", dataIndex: "role_id", key: "role_id" },
    { title: "Status", dataIndex: "status", key: "status" },
  ];

  const activityColumns = [
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "# of Emails", dataIndex: "num_emails", key: "num_emails" },
    {
      title: "# of Icebreakers",
      dataIndex: "num_icebreakers",
      key: "num_icebreakers",
    },
  ];

  const userData = useMemo(() => {
    return workspace["User Details"]?.map((user) => ({
      key: user.id,
      ...user,
    }));
  }, [workspace]);

  const activityData = useMemo(() => {
    return workspace["Activity Details"]
      ? Object.values(workspace["Activity Details"]).map((activity) => ({
          key: activity.email,
          email: activity.email,
          num_emails: activity["# of Emails"],
          num_icebreakers: activity["# of Icebreakers"],
        }))
      : [];
  }, [workspace]);

  return (
    <Layout>
      <Navbar />
      <Content className="p-20">
        <Space direction="vertical" size="large" className="w-full">
          {loading ? (
            <LoadingBox message="Workspace Details..." />
          ) : error ? (
            <ErrorBox message={error} />
          ) : (
            <>
              <Title level={2} align="center">
                Workspace Details
              </Title>
              <Row gutter={16}>
                <Col span={12}>
                  <Card title="Workspace Info">
                    <p>
                      <strong>Workspace ID:</strong> {workspace["Workspace id"]}
                    </p>
                    <p>
                      <strong>Workspace Name:</strong>{" "}
                      {workspace["Workspace name"]}
                    </p>
                    <p>
                      <strong>Created Date:</strong>{" "}
                      {new Date(workspace["Created Date"]).toLocaleString()}
                    </p>
                  </Card>
                </Col>
                <Col span={12}>
                  <Card title="Subscription Details">
                    <p>
                      <strong> # Active Users:</strong>
                    </p>
                    <p>
                      <strong># Total Users:</strong>
                    </p>
                  </Card>
                </Col>
              </Row>
              <Card title="User Details" className="mt-6">
                <Table
                  columns={userColumns}
                  dataSource={userData}
                  pagination={{ pageSize: 5 }}
                />
              </Card>
              <Card title="Activity Details" className="mt-6">
                <Table
                  columns={activityColumns}
                  dataSource={activityData}
                  pagination={{ pageSize: 5 }}
                />
              </Card>
            </>
          )}
        </Space>
      </Content>
    </Layout>
  );
};

export default Details;
