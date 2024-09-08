import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { FaUsers, FaWallet } from "react-icons/fa6";
import { TbSoupFilled, TbTruckDelivery } from "react-icons/tb";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  PieChart,
  Pie,
  ResponsiveContainer,
  Legend,
} from "recharts";

const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const AdminHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: stats = {} } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats");
      return res.data;
    },
  });

  const { data: chartData = [] } = useQuery({
    queryKey: ["order-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/order-stats");
      return res.data;
    },
  });

  // custom shape for the bar chart
  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${
      x + width / 2
    },${y + height / 3}
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
      x + width
    }, ${y + height}
  Z`;
  };

  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;

    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };

  // Custom shape for the pie chart
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const pieChartData = chartData.map((data) => {
    return { name: data.category, value: data.revenue };
  });

  return (
    <div className="bg-base-200 min-h-screen py-12 px-6">

      <div className="text-3xl mb-6">
        <span>Hi, Welcome </span>
        <span className="font-semibold">
          {user?.displayName ? user.displayName : "Back"}
        </span>
      </div>

      <div className="flex justify-evenly w-full gap-6 mb-8">
        <div className="stats shadow w-[293px] h-[150px]">
          <div className="stat">
            <div className="stat-figure text-secondary">
              <FaWallet className="w-14 h-14" />
            </div>
            <div className="stat-title">Revenue</div>
            <div className="stat-value">${stats.revenue}</div>
            <div className="stat-desc">Jan 1st - Feb 1st</div>
          </div>
        </div>
        <div className="stats shadow  w-[293px] h-[150px]">
          <div className="stat">
            <div className="stat-figure text-secondary">
              <FaUsers className="w-14 h-14" />
            </div>
            <div className="stat-title">Users</div>
            <div className="stat-value">{stats.users}</div>
            <div className="stat-desc">↗︎ 400 (22%)</div>
          </div>
        </div>
        <div className="stats shadow  w-[293px] h-[150px]">
          <div className="stat">
            <div className="stat-figure text-secondary">
              <TbSoupFilled className="w-14 h-14" />
            </div>
            <div className="stat-title">Products</div>
            <div className="stat-value">{stats.menuItems}</div>
            <div className="stat-desc">↗︎ 400 (22%)</div>
          </div>
        </div>
        <div className="stats shadow  w-[293px] h-[150px]">
          <div className="stat">
            <div className="stat-figure text-secondary">
              <TbTruckDelivery className="w-14 h-14" />
            </div>
            <div className="stat-title">Orders</div>
            <div className="stat-value">{stats.orders}</div>
            <div className="stat-desc">↘︎ 90 (14%)</div>
          </div>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row bg-white py-3">
        <div className="xl:w-1/2">
          <ResponsiveContainer width="100%" height={500}>
            <BarChart
              // width={800}
              // height={500}
              data={chartData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Bar
                dataKey="quantity"
                fill="#8884d8"
                shape={<TriangleBar />}
                label={{ position: "top" }}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % 6]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="w-1/2">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius="80%"
                fill="#8884d8"
                dataKey="value"
              >
                {pieChartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
