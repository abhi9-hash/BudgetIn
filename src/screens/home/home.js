import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { listWorkspaces } from "../../components/actions/workspaceActions";
import {
  Layout,
  Button,
  Form,
  Input,
  Select,
  Typography,
  Row,
  Col,
} from "antd";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar";

const { Content } = Layout;
const { Title } = Typography;
const { Option } = Select;

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [criteria, setCriteria] = useState("Domain");
  const [search, setSearch] = useState("");

  const handleClick = () => {
    dispatch(listWorkspaces(criteria, search, navigate));
  };

  const handleDropdownChange = (value) => {
    setCriteria(value);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <Layout>
      <Navbar />
      <Content>
        <Row className="h-dvh flex flex-col">
          <Row span={24} className=" flex flex-row justify-center items-center">
            <Col span={12}>
              <Title level={3} className="text-center mt-60">
                Search for your workspace with either Workspace Name, ID or
                Domain
              </Title>
              <Form layout="vertical" onFinish={handleClick}>
                <Row gutter={16} className="mt-20">
                  <Col span={8}>
                    <Form.Item label="Select Option">
                      <Select value={criteria} onChange={handleDropdownChange}>
                        <Option value="Name">Workspace Name</Option>
                        <Option value="ID">ID</Option>
                        <Option value="Domain">Domain</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={16}>
                    <Form.Item label="Search">
                      <Input
                        placeholder="Enter your value"
                        value={search}
                        onChange={handleSearch}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row justify="center">
                  <Button
                    type="primary"
                    htmlType="submit"
                    disabled={search === "" || criteria === ""}
                  >
                    Submit
                  </Button>
                </Row>
              </Form>
            </Col>
          </Row>
        </Row>
      </Content>
    </Layout>
  );
}
