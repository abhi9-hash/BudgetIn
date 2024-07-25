import { CSVDownload } from "react-csv";

const headerSetter = (headers) => {
  return {
    headers: [...headers.map((i) => i.title), "Admin Fee", "Total"],
    keys: [...headers.map((i) => i.key), "admin_fee", "total"],
  };
};

const dataSetter = (
  totalCost,
  costTotalMap,
  data,
  allocationMap,
  discountMap,
  type,
  period
) => {
  const employeeData = [];
  data.forEach((item) => {
    employeeData.push([
      item.name,
      item.designation,
      item.rate,
      // allocationMap[item.key],
      discountMap[item.key],
      ...Object.values(item.inputData[period]).map((i) =>
        type == "rate" ? i.workingCost : i.workingHours
      ),
      0.05 * totalCost,
      type == "rate"
        ? item.total.workingCost[period] + 0.05 * totalCost
        : item.total.workingHours[period],
    ]);
  });
  if (type == "rate")
    employeeData.push([
      "",
      "",
      "",
      "",
      ...Object.values(costTotalMap[period]),
      employeeData.length * 0.05 * totalCost,
       totalCost+employeeData.length * 0.05 *totalCost,
    ]);
  console.log(employeeData);
  return employeeData;
};

export const HandleCsvDownload = ({
  totalCost,
  costTotalMap,
  setDownload,
  data,
  headers,
  setCsvData,
  allocationMap,
  discountMap,
  type,
  period,
}) => {
  //   const [csvData, setCsvData] = useState([
  //     ["header1", "header2", "header3"],
  //     ["row1_col1", "row1_col2", "row1_col3"],
  //     ["row2_col1", "row2_col2", "row2_col3"],
  //   ]);

  //   const [download, setDownload] = useState(false);

  const handleDownload = () => {
    const dataList = dataSetter(
      totalCost,
      costTotalMap,
      data,
      allocationMap,
      discountMap,
      type,
      period
    );
    const headerList = headerSetter(headers);
    setCsvData([headerList.headers, ...dataList]);
    setDownload(true);
    // Reset download state after a short delay to allow multiple downloads
    setTimeout(() => setDownload(false), 1000);
    console.log([headerList.headers, ...dataList]);
  };

  handleDownload();
};
