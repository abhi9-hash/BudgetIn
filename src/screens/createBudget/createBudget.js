import React, { useState, useMemo, useEffect } from "react";
import {
  Layout,
  // DatePicker,
  Select,
  Form,
  Button,
  Typography,
  Radio,
} from "antd";
import moment from "moment";
import Navbar from "../../components/navbar";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import {
  TableContainer,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Paper,
  Input,
  Autocomplete,
  TextField,
  // DatePicker
} from "@mui/material";
import { generateLabels } from "../../components/utilties/utilities";
import DatePicker from "react-date-picker";
import { HandleCsvDownload } from "../../components/utilties/dataExport";
import { CSVDownload } from "react-csv";

const { Content } = Layout;
// const { RangePicker } = DatePicker;
const { Option } = Select;
const { Title } = Typography;

const ProjectBudget = () => {
  const [form] = Form.useForm();
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [selectedEmployeesList, setSelectedEmployeesList] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [dateRange, setDateRange] = useState([]);
  const [dates, setDates] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [period, setPeriod] = useState("weekly");
  const [projectName, setProjectName] = useState("");
  const [clientName, setClientName] = useState("");
  const [dailyHours, setDailyHours] = useState(9);
  const [totalHours, setTotalHours] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [selectedEmployeesLength, setselectedEmployeesLength] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [allocationMap, setAllocationMap] = useState({});
  const [costMap, setCostMap] = useState({
    weekly: {},
    monthly: {},
    yearly: {},
  });
  const [discountCostMap, setDiscountCostMap] = useState({
    weekly: {},
    monthly: {},
    yearly: {},
  });
  const [costTotalMap, setCostTotalMap] = useState({
    weekly: {},
    monthly: {},
    yearly: {},
  });

  const [firstTotal, setFirstTotal] = useState({
    weekly: true,
    monthly: true,
    yearly: true,
  });
  const [discountMap, setDiscountMap] = useState({});
  const [hoursDownload, setHoursDownload] = useState(false);
  const [budgetDownload, setBudgetDownload] = useState(false);
  const [csvData, setCsvData] = useState([]);
  const [triggerMemo, setTriggerMemo] = useState(false);
  const [labels, setLabels] = useState({});
  // const handleDateChange = (dates) => {
  //   const dt = JSON.parse(JSON.stringify(dates))
  //   console.log([dates,
  //     moment(dt[0]).format("YYYY-MM-DD"),
  //     moment(dt[1]).format("YYYY-MM-DD"),
  //   ]);
  //   setDates([
  //     moment(dates[0]).format("YYYY-MM-DD"),
  //     moment(dt[1]).format("YYYY-MM-DD"),
  //   ]);
  // };

  useEffect(() => {
    const employeeList = [
      {
        id: 1,
        name: "Abhinav",
        designation: "Associate",
        rate: 50,
        utilization: 0.8,
      },
      {
        id: 2,
        name: "Anirudh",
        designation: "Director",
        rate: 80,
        discount: 15,
        utilization: 0.7,
      },
      {
        id: 3,
        name: "Manish",
        designation: "Managing Director",
        rate: 100,
        discount: 15,
        utilization: 0.7,
      },
      {
        id: 4,
        name: "Leesha",
        designation: "Associate",
        rate: 50,
        utilization: 0.8,
      },
      {
        id: 5,
        name: "Nachi",
        designation: "Director",
        rate: 80,
        discount: 15,
        utilization: 0.7,
      },
      {
        id: 6,
        name: "Mark",
        designation: "Managing Director",
        rate: 100,
        discount: 15,
        utilization: 0.7,
      },
      {
        id: 7,
        name: "Parnith",
        designation: "Associate",
        rate: 50,
        utilization: 0.8,
      },
      {
        id: 8,
        name: "Rahul",
        designation: "Director",
        rate: 80,
        discount: 15,
        utilization: 0.7,
      },
      {
        id: 9,
        name: "Anshul",
        designation: "Managing Director",
        rate: 100,
        discount: 15,
        utilization: 0.7,
      },
    ];
    const allocationObj = {};
    const discountObj = {};
    employeeList.forEach((i) => {
      allocationObj[i.id] = 100;
      discountObj[i.id] = 0;
    });
    console.log({ allocationObj, discountObj });
    setAllocationMap(allocationObj);
    setDiscountMap(discountObj);
    setEmployees(employeeList);
  }, []);

  const handleDateChange = () => {
    if (startDate !== "" && endDate !== "") {
      setDateRange([
        moment(startDate).format("YYYY-MM-DD"),
        moment(endDate).format("YYYY-MM-DD"),
      ]);
      // console.log({ startDate, endDate });
    } else {
      setDateRange([null, null]);
    }
    setSelectedEmployees([]);
    setTableData([]);
    setTotalHours(0);
  };

  const handleEmployeeChange = (_, value) => {
    console.log({ value });
    setSelectedEmployeesList(value);
    if (!value.length) {
      setTableData([]);
    }
  };

  const handleEmployeeChangeSet = () => {
    // console.log({ value });
    setSelectedEmployees(selectedEmployeesList.map((i) => i.id));
    setselectedEmployeesLength(selectedEmployeesList?.length);
    // if (!value.length) {
    //   setTableData([]);
    // }
  };

  const handleDailyHoursChange = (value) => {
    setSelectedEmployees([]);
    setTableData([]);
    setDailyHours(value);
  };

  const handleTotalHoursChange = (value) => {
    setSelectedEmployees([]);
    setTableData([]);
    setTotalHours(value);
  };

  const handleTotalCostChange = (value) => {
    setSelectedEmployees([]);
    setTableData([]);
    setTotalCost(value);
  };

  const handlePeriodChange = (e) => {
    setPeriod(e.target.value);
  };

  const handleDiscountChange = (value) => {
    setDiscount(value);
    const discountObj = {};
    console.log(employees);
    employees.forEach((i) => {
      discountObj[i.id] = value;
    });
    setDiscountMap(discountObj);
  };

  const handleAllocationChange = (value, empId) => {
    setAllocationMap({ ...allocationMap, [empId]: value });
  };

  const handleEmployeeDiscountChange = (value, empId) => {
    setDiscountMap({ ...discountMap, [empId]: value });
  };

  const handleEmployeeDiscountCostChange = (value, empId) => {
    generateTableData({
      weekLabelsArg: labels.weeklyColumns,
      monthLabelsArg: labels.monthlyColumns,
      yearLabelsArg: labels.yearlyColumns,
      totalWorkingDays: labels.totalDays,
    });
  };

  const handleEmployeeCostChange = (value, empId, label, row) => {
    setCostMap({
      ...costMap,
      [period]: {
        ...costMap[period],
        [empId]: {
          ...costMap[period][empId],
          [label]: Number(value),
        },
      },
    });

    costMap[period][empId][label] = Number(value);

    row.inputData[period][label].workingCost = Number(value);
    console.log(
      value,
      costMap[period][empId][label],
      (row.inputData[period][label].workingCost = value),
      costMap
    );

    generateTableData({
      weekLabelsArg: labels.weeklyColumns,
      monthLabelsArg: labels.monthlyColumns,
      yearLabelsArg: labels.yearlyColumns,
      totalWorkingDays: labels.totalDays,
    });
    // setTriggerMemo(true);
  };

  const generateTableData = ({
    weekLabelsArg,
    monthLabelsArg,
    yearLabelsArg,
    totalWorkingDays,
  }) => {
    costTotalMap["weekly"] = {};
    costTotalMap["monthly"] = {};
    costTotalMap["yearly"] = {};
    let weekLabels, monthLabels, yearLabels;
    // selectedEmployees.forEach((id) => {
    //   costMap["weekly"][id] = {}
    //   costMap["monthly"] = { ...costMap["monthly"], [id]: {} };
    //   costMap["yearly"] = { ...costMap["yearly"], [id]: {} };
    // });
    console.log({ costMap });
    const newTableData = selectedEmployees.map((employeeId) => {
      const employee = employees.find((emp) => emp.id === employeeId);
      weekLabels = JSON.parse(JSON.stringify(weekLabelsArg));
      monthLabels = JSON.parse(JSON.stringify(monthLabelsArg));
      yearLabels = JSON.parse(JSON.stringify(yearLabelsArg));
      if (!costMap["weekly"][employeeId]) costMap["weekly"][employeeId] = {};
      if (!costMap["monthly"][employeeId]) costMap["monthly"][employeeId] = {};
      if (!costMap["yearly"][employeeId]) costMap["yearly"][employeeId] = {};

      if (!discountCostMap["weekly"][employeeId])
        discountCostMap["weekly"][employeeId] = {};
      if (!discountCostMap["monthly"][employeeId])
        discountCostMap["monthly"][employeeId] = {};
      if (!discountCostMap["yearly"][employeeId])
        discountCostMap["yearly"][employeeId] = {};
      Object.keys(weekLabels).forEach((i) => {
        if (
          costMap["weekly"][employeeId][i] == undefined ||
          costMap["weekly"][employeeId][i] == null
        ) {
          console.log("inside object", costMap["weekly"][employeeId][i]);
          costMap["weekly"][employeeId] = {
            ...costMap["weekly"][employeeId],
            [i]: Number(
              (weekLabels[i].workingDays * totalCost) /
                (selectedEmployeesLength * totalWorkingDays)
            ).toFixed(2),
          };
        }
        discountCostMap["weekly"][employeeId][i] =
          (costMap["weekly"][employeeId][i] *
            (100 - discountMap[employee.id])) /
          100;
        if (!(i in costTotalMap["weekly"]))
          costTotalMap["weekly"][i] = Number(
            discountCostMap["weekly"][employeeId][i]
          );
        // if(costTotalMap["weekly"][i] == 0)
        else {
          costTotalMap["weekly"][i] = (
            Number(costTotalMap["weekly"][i]) +
            Number(discountCostMap["weekly"][employeeId][i])
          ).toFixed(2);
        }
        console.log(costMap, costTotalMap, { discountCostMap });

        // console.log((costMap["weekly"][employeeId][i]).toFixed(2))
        // const workingCost = costMap["weekly"][employeeId]
        // ((weekLabels[i].workingDays * allocationMap[employee.id]) / 100) *
        // dailyHours;
        const workingHours =
          ((weekLabels[i].workingDays * allocationMap[employee.id]) / 100) *
          dailyHours;
        delete weekLabels[i];
        weekLabels[i] = {
          workingHours: (
            discountCostMap["weekly"][employeeId][i] / employee.rate
          ).toFixed(2),
          workingCost: discountCostMap["weekly"][employeeId][i],
          // (workingHours * employee.rate * (100 - discountMap[employee.id])) /
          // 100,
        };
      });

      // console.log({ costMap, costTotalMap });
      // setFirstTotal({ ...firstTotal, weekly: false });
      firstTotal["weekly"] = false;

      Object.keys(monthLabels).forEach((i) => {
        if (
          costMap["monthly"][employeeId][i] == undefined ||
          costMap["monthly"][employeeId][i] == null
        ) {
          costMap["monthly"][employeeId] = {
            ...costMap["monthly"][employeeId],
            [i]: (
              (monthLabels[i].workingDays * totalCost) /
              (selectedEmployeesLength * totalWorkingDays)
            ).toFixed(2),
          };
        }

        discountCostMap["monthly"][employeeId][i] =
          (costMap["monthly"][employeeId][i] *
            (100 - discountMap[employee.id])) /
          100;

        if (!(i in costTotalMap["monthly"]))
          costTotalMap["monthly"][i] = Number(
            discountCostMap["monthly"][employeeId][i]
          );
        else
          costTotalMap["monthly"][i] = (
            Number(costTotalMap["monthly"][i]) +
            Number(discountCostMap["monthly"][employeeId][i])
          ).toFixed(2);

        const workingHours =
          ((monthLabels[i].workingDays * allocationMap[employee.id]) / 100) *
          dailyHours;
        delete monthLabels[i];
        monthLabels[i] = {
          // workingHours: workingHours,
          // workingCost:
          //   (workingHours * employee.rate * (100 - discountMap[employee.id])) /
          //   100,
          workingHours: (
            discountCostMap["monthly"][employeeId][i] / employee.rate
          ).toFixed(2),
          workingCost: discountCostMap["monthly"][employeeId][i],
        };
      });
      // setFirstTotal({ ...firstTotal, monthly: false });
      firstTotal["monthly"] = false;

      Object.keys(yearLabels).forEach((i) => {
        if (
          costMap["yearly"][employeeId][i] == undefined ||
          costMap["yearly"][employeeId][i] == null
        )
          costMap["yearly"][employeeId] = {
            ...costMap["yearly"][employeeId],
            [i]: (
              (yearLabels[i].workingDays * totalCost) /
              (selectedEmployeesLength * totalWorkingDays)
            ).toFixed(2),
          };

        discountCostMap["yearly"][employeeId][i] =
          (costMap["yearly"][employeeId][i] *
            (100 - discountMap[employee.id])) /
          100;

        if (!(i in costTotalMap["yearly"]))
          costTotalMap["yearly"][i] = Number(discountCostMap["yearly"][employeeId][i]);
        else
          costTotalMap["yearly"][i] = (
            Number(costTotalMap["yearly"][i]) +
            Number(discountCostMap["yearly"][employeeId][i])
          ).toFixed(2);
        // setFirstTotal({ ...firstTotal, yearly: false });

        const workingHours =
          ((yearLabels[i].workingDays * allocationMap[employee.id]) / 100) *
          dailyHours;
        delete yearLabels[i];
        yearLabels[i] = {
          // workingHours: workingHours,
          // workingCost:
          //   (workingHours * employee.rate * (100 - discountMap[employee.id])) /
          //   100,
          workingHours: (
            discountCostMap["yearly"][employeeId][i] / employee.rate
          ).toFixed(2),
          workingCost: discountCostMap["yearly"][employeeId][i],
        };
      });

      firstTotal["yearly"] = false;
      const totalWorkingHours = Number(
        Object.values(yearLabels).reduce(
          (partialSum, a) => partialSum + a.workingHours,
          0
        )
      ).toFixed(1);

      const totalWorkingCost = Number(
        Object.values(yearLabels).reduce(
          (partialSum, a) => partialSum + a.workingCost,
          0
        )
      ).toFixed(1);

      console.log({ costTotalMap });

      return {
        key: employee.id,
        name: employee.name,
        designation: employee.designation,
        rate: employee.rate,
        // utilization: employee.utilization,
        total: {
          workingCost: totalWorkingCost,
          workingHours: totalWorkingHours,
        },
        inputData: {
          weekly: weekLabels,
          monthly: monthLabels,
          yearly: yearLabels,
        },
      };
    });
    setTableData(newTableData);
    console.log({
      weekly: weekLabels,
      monthly: monthLabels,
      yearly: yearLabels,
    });
  };

  const handleInputChange = (value, recordKey, dateKey) => {
    const newData = tableData.map((item) => {
      if (item.key === recordKey) {
        const updatedItem = { ...item, [dateKey]: value || 0 };
        updatedItem.total = Object.keys(updatedItem)
          .filter((key) =>
            key.match(/^\d{4}-\d{2}-\d{2}$|^\D{3,9}\s\d{4}$|^\d{4}$/)
          ) // Only period keys
          .reduce((sum, key) => sum + updatedItem[key], 0);
        return updatedItem;
      }
      return item;
    });
    setTableData(newData);
  };

  const {
    weeklyColumns,
    monthlyColumns,
    yearlyColumns,
    weeklyData,
    monthlyData,
    yearlydata,
  } = useMemo(() => {
    console.log("inside memo", costMap);
    const basicColumns = [
      { title: "Employee Name", dataIndex: "name", key: "name" },
      {
        title: "Employee Designation",
        dataIndex: "designation",
        key: "designation",
      },
      {
        title: "Hourly Rate ($)",
        dataIndex: "rate",
        key: "rate",
        render: (text) => `$${text}`,
      },
      // {
      //   title: "Allocation (%)",
      //   dataIndex: "allocation",
      //   key: "allocation",
      //   render: (text) => `${text * 100}%`,
      // },
      {
        title: "Discount (%)",
        dataIndex: "discount",
        key: "discount",
        render: (text) => `${text * 100}%`,
      },
    ];

    const periodColumns = [];
    let weeklyColumns = {},
      monthlyColumns = {},
      yearlyColumns = {},
      totalDays = 0;
    if (dateRange && dateRange[0] && dateRange[1]) {
      // console.log("dateRange", dateRange);
      const { weekLabels, monthLabels, yearLabels, totalWorkingDays } =
        generateLabels(new Date(dateRange[0]), new Date(dateRange[1]));
      weeklyColumns = weekLabels;
      monthlyColumns = monthLabels;
      yearlyColumns = yearLabels;
      totalDays = totalWorkingDays;
    }

    setLabels({
      weeklyColumns,
      monthlyColumns,
      yearlyColumns,
      totalDays,
    });

    generateTableData({
      weekLabelsArg: weeklyColumns,
      monthLabelsArg: monthlyColumns,
      yearLabelsArg: yearlyColumns,
      totalWorkingDays: totalDays,
    });

    // const totalColumn = {
    //   title: "Total Hours",
    //   dataIndex: "total",
    //   key: "total",
    //   render: (text) => <strong>{text}</strong>,
    // };

    setTriggerMemo(false);
    return {
      weeklyColumns: [
        ...basicColumns,
        ...Object.keys(weeklyColumns).map((i) => ({
          ...weeklyColumns[i],
          title: i,
          key: i,
        })),
        // totalColumn,
      ],
      monthlyColumns: [
        ...basicColumns,
        ...Object.keys(monthlyColumns).map((i) => ({
          ...monthlyColumns[i],
          title: i,
          key: i,
        })),
        // totalColumn,
      ],
      yearlyColumns: [
        ...basicColumns,
        ...Object.keys(yearlyColumns).map((i) => ({
          ...yearlyColumns[i],
          title: i,
          key: i,
        })),
        // totalColumn,
      ],
      weeklyData: Object.keys(weeklyColumns).map(
        (i) => weeklyColumns[i].workingDays
      ),
      monthlyData: Object.keys(monthlyColumns).map(
        (i) => monthlyColumns[i].workingDays
      ),
      yearlydata: Object.keys(yearlyColumns).map(
        (i) => yearlyColumns[i].workingDays
      ),
    };
  }, [
    dateRange,
    period,
    dailyHours,
    totalHours,
    selectedEmployees,
    employees,
    discount,
    discountMap,
    allocationMap,
    triggerMemo,
    // firstTotal
  ]);

  return (
    <Layout>
      <Navbar /> {/* Assuming Navbar is correctly implemented and imported */}
      <Content className="p-10">
        <Title level={2} className="mt-8">
          Project Budget
        </Title>
        <Form
          form={form}
          onFinish={(values) => console.log("Form Values:", values)}
          className="space-y-6"
        >
          <div className="flex space-x-4 flex-row flex-wrap">
            <Form.Item label="Project Name" className="flex-1">
              <Input
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                // disabled={!selectedEmployees.length}
              />
            </Form.Item>
            <Form.Item label="Client Name" className="flex-1">
              <Input
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                // disabled={!selectedEmployees.length}
              />
            </Form.Item>
            <Form.Item label="Project Date Range">
              {/* <RangePicker onChange={handleDateChange} /> */}
              <DatePicker
                onChange={(value) => {
                  // console.log({ value });
                  setStartDate(value);
                }}
                value={startDate}
              />

              <DatePicker
                onChange={(value) => {
                  // console.log({ value });
                  setEndDate(value);
                }}
                value={endDate}
              />

              <Button onClick={handleDateChange}> Set </Button>
            </Form.Item>
          </div>
          <div className="flex flex-row flex-wrap space-x-4 ">
            {/* <Form.Item label="Total Project Hours">
              <Input
                type="number"
                min={0}
                value={totalHours}
                onChange={(e) => handleTotalHoursChange(Number(e.target.value))}
                // disabled={!selectedEmployees.length}
              />
            </Form.Item> */}
            <Form.Item label="Total Project Cost">
              <Input
                type="number"
                min={0}
                value={totalCost}
                onChange={(e) => handleTotalCostChange(Number(e.target.value))}
                // disabled={!selectedEmployees.length}
              />
            </Form.Item>
            <Form.Item label="Project Discount (%)">
              <Input
                type="number"
                min={0}
                value={discount}
                onChange={(e) => handleDiscountChange(Number(e.target.value))}
                // disabled={!selectedEmployees.length}
              />
            </Form.Item>
          </div>
          <div className="flex justify-center items-center space-x-4 w-6/12">
            <Form.Item label="Select Employees" className="flex-1">
              <Autocomplete
                getOptionLabel={(option) => option.name}
                multiple
                disableCloseOnSelect
                options={employees}
                onChange={handleEmployeeChange}
                disabled={totalCost == 0}
                // value={selectedEmployees}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    className="overflow-y-clip max-h-15"
                    label="Select employees"
                    variant="filled"
                  />
                )}
              />
            </Form.Item>
            <Button onClick={handleEmployeeChangeSet}> Set </Button>
          </div>
          <div className="flex space-x-4">
            <Radio.Group onChange={handlePeriodChange} value={period}>
              <Radio value="weekly">Weekly</Radio>
              <Radio value="monthly">Monthly</Radio>
              <Radio value="yearly">Yearly</Radio>
            </Radio.Group>
          </div>
          {/* <Table
            columns={columns}
            dataSource={tableData}
            pagination={false}
            scroll={{ x: true }}
          /> */}
          <Title level={3}>Budget Table</Title>
          <TableContainer title="Budget Table" component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  {period === "weekly" &&
                    weeklyColumns.map((col) => (
                      <TableCell key={col.key}>{col.title}</TableCell>
                    ))}
                  {period === "monthly" &&
                    monthlyColumns.map((col) => (
                      <TableCell key={col.key}>{col.title}</TableCell>
                    ))}
                  {period === "yearly" &&
                    yearlyColumns.map((col) => (
                      <TableCell key={col.key}>{col.title}</TableCell>
                    ))}
                  <TableCell key="total">Total Cost {` ($)`}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tableData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.designation}</TableCell>
                    <TableCell>{row.rate}</TableCell>
                    {/* <TableCell>
                      <Input
                        type="number"
                        min={0}
                        defaultValue={allocationMap[row.key]}
                        value={allocationMap[row.key]}
                        onChange={(e) => {
                          handleAllocationChange(
                            Number(e.target.value),
                            row.key
                          );
                        }}
                      />
                    </TableCell> */}
                    <TableCell>
                      <Input
                        type="number"
                        min={0}
                        defaultValue={discountMap[row.key]}
                        value={discountMap[row.key]}
                        onChange={(e) => {
                          handleEmployeeDiscountChange(
                            Number(e.target.value),
                            row.key
                          );
                          handleEmployeeDiscountCostChange(
                            Number(e.target.value),
                            row.key
                          );
                        }}
                      />
                    </TableCell>

                    {Object.keys(row.inputData[period]).map((i, j) => (
                      <TableCell key={i + index}>
                        <Input
                          type="number"
                          min={0}
                          // defaultValue={row.inputData[period][i].workingCost}
                          value={discountCostMap[period][row.key][i]}
                          onChange={(e) => {
                            handleEmployeeCostChange(
                              Number(e.target.value),
                              row.key,
                              i,
                              row
                            );
                          }}
                        />
                      </TableCell>
                    ))}

                    <TableCell key={"total" + index}>
                      {row.total.workingCost}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  {/* <TableCell>khjb</TableCell>
                  <TableCell>bkjb</TableCell>
                  <TableCell>hou</TableCell>
                  <TableCell>h</TableCell> */}

                  {period === "weekly" &&
                    weeklyColumns.map((col) => (
                      <TableCell key={col.key}>
                        {costTotalMap[period][col.key]}
                      </TableCell>
                    ))}
                  {period === "monthly" &&
                    monthlyColumns.map((col) => (
                      <TableCell key={col.key}>
                        {costTotalMap[period][col.title]}
                      </TableCell>
                    ))}
                  {period === "yearly" &&
                    yearlyColumns.map((col) => (
                      <TableCell key={col.key}>
                        {costTotalMap[period][col.title]}
                      </TableCell>
                    ))}
                  <TableCell>{""} </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <div className="flex w-full justify-between my-5">
            <Button
              type="primary"
              onClick={(e) =>
                HandleCsvDownload({
                  setDownload: setBudgetDownload,
                  data: tableData,
                  allocationMap: allocationMap,
                  discountMap: discountMap,
                  period: period,
                  setCsvData: setCsvData,
                  type: "rate",
                  headers:
                    period == "weekly"
                      ? weeklyColumns
                      : period == "monthly"
                      ? monthlyColumns
                      : yearlyColumns,
                })
              }
            >
              Export Cost Sheet
            </Button>
            {budgetDownload && <CSVDownload data={csvData} target="_blank" />}
            {/* {JSON.stringify(csvData)} */}
          </div>

          <Title level={3}>Employee Hours Table</Title>
          <TableContainer title="Employee Hours Table" component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  {period === "weekly" &&
                    weeklyColumns.map(
                      (col) =>
                        col.key !== "discount" && (
                          <TableCell key={col.key}>{col.title}</TableCell>
                        )
                    )}
                  {period === "monthly" &&
                    monthlyColumns.map(
                      (col) =>
                        col.key !== "discount" && (
                          <TableCell key={col.key}>{col.title}</TableCell>
                        )
                    )}
                  {period === "yearly" &&
                    yearlyColumns.map(
                      (col) =>
                        col.key !== "discount" && (
                          <TableCell key={col.key}>{col.title}</TableCell>
                        )
                    )}
                  <TableCell key="total">Total Hours</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tableData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.designation}</TableCell>
                    <TableCell>{row.rate}</TableCell>
                    {/* <TableCell>
                      <Input
                        type="number"
                        min={0}
                        defaultValue={allocationMap[row.key]}
                        value={allocationMap[row.key]}
                        onChange={(e) => {
                          handleAllocationChange(
                            Number(e.target.value),
                            row.key
                          );
                        }}
                      />
                    </TableCell> */}
                    {/* <TableCell>
                      <Input
                        type="number"
                        min={0}
                        defaultValue={discountMap[row.key]}
                        value={discountMap[row.key]}
                        onChange={(e) => {
                          handleEmployeeDiscountChange(
                            Number(e.target.value),
                            row.key
                          );
                        }}
                      />
                    </TableCell> */}

                    {Object.keys(row.inputData[period]).map((i, j) => (
                      <TableCell key={i + index}>
                        {row.inputData[period][i].workingHours}
                      </TableCell>
                    ))}

                    <TableCell key={"total" + index}>
                      {row.total.workingHours}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <div className="flex w-full justify-between my-5">
            <Button
              type="primary"
              onClick={(e) =>
                HandleCsvDownload({
                  setDownload: setHoursDownload,
                  data: tableData,
                  allocationMap: allocationMap,
                  discountMap: discountMap,
                  setCsvData: setCsvData,
                  period: period,
                  type: "hours",
                  headers:
                    period == "weekly"
                      ? weeklyColumns
                      : period == "monthly"
                      ? monthlyColumns
                      : yearlyColumns,
                })
              }
            >
              Export Hours Sheet
            </Button>
            {hoursDownload && <CSVDownload data={csvData} target="_blank" />}
            {/* {JSON.stringify(csvData)} */}
          </div>

          {/* <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item> */}
        </Form>
      </Content>
    </Layout>
  );
};

export default ProjectBudget;
