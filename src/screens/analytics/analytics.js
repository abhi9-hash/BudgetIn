import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { Layout, Typography, Table, Row, Col, Card } from "antd";
import { workspacesAnalytics } from "../../components/actions/workspaceActions";
import LoadingBox from "../../components/loadingBox";
import DateIntegerPlot from "../../components/plot";
import Navbar from "../../components/navbar";
import ErrorBox from "../../components/errorBox";

const { Content } = Layout;
const { Title } = Typography;

const Details = () => {
  const {
    state: { type },
  } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

 const [startDate, setStartDate] = useState('02-03-2024')
 const [endDate, setEndDate] = useState('25-05-2024')

  useEffect(() => {
    if (type?.length) {
      dispatch(workspacesAnalytics(type,startDate, endDate));
    }
  }, [dispatch, type, startDate, endDate]);

  const {
    loading,
    error,
    workspace_analytics,
    workspace_activity,
    weekly_signups,
  } = useSelector((state) => state.workspacesAnalytics);

  const handleRowClick = (id) => {
    navigate(`/workspace/${id}`);
  };

  const columns = [
    { title: "Workspace Id", dataIndex: "workspace_id", key: "workspace_id" },
    { title: "Name", dataIndex: "name", key: "name" },
    {
      title: "Creator Email",
      dataIndex: "creator_email",
      key: "creator_email",
    },
    {
      title: "Activity Count",
      dataIndex: "activity_count",
      key: "activity_count",
    },
  ];

  return (
    <Layout>
      <Navbar />
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <ErrorBox message={error} />
      ) : (
        <Content className="p-20">
          {type === "workspacesactivity" && (
            <>
              <Title level={2} align="center" gutterBottom>
                Workspace Activity
              </Title>
              <Table
                columns={columns}
                dataSource={workspace_activity}
                onRow={(record) => {
                  return {
                    onClick: () => handleRowClick(record.workspace_id),
                  };
                }}
                pagination={{ pageSize: 5 }}
                className="cursor-pointer"
              />
            </>
          )}

          {type === "weeklysignups" && (
            <>
              <Title level={2} align="center" gutterBottom>
                Weekly Signups
              </Title>
              <DateIntegerPlot data={weekly_signups || {}} />
            </>
          )}

          {type === "featureUsage" && (
            <>
              <Title level={2} align="center" gutterBottom>
                Feature Usage Statistics
              </Title>
              <Row justify="center" className="p-5">
                <Col span={24}>
                  <Card
                    title="Usage Statistics"
                    bordered={false}
                    className="w-full"
                  >
                    {workspace_analytics &&
                      Object.entries(workspace_analytics)?.map(
                        ([key, value]) => (
                          <Row key={key} className="mb-2.5">
                            <Col span={12} className="font-bold">
                              {key}
                            </Col>
                            <Col span={12}>{value}</Col>
                          </Row>
                        )
                      )}
                  </Card>
                </Col>
              </Row>
            </>
          )}
        </Content>
      )}
    </Layout>
  );
};

export default Details;
