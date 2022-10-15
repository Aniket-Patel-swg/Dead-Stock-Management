import React,{ useCallback,useState } from "react";
import '../Assets/productInfo.css';
import SideBar from "./SideBar";
import { ResponsiveContainer, Pie, PieChart, Sector } from 'recharts'

const data = [
    { name: "Stock", value: 75 },
    { name: "Expiry", value: 100 },
];

const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
      percent,
      value
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";

    return (
        <g>
          <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
            {payload.name}
          </text>
          <Sector
            cx={cx}
            cy={cy}
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            startAngle={startAngle}
            endAngle={endAngle}
            fill={fill}
          />
          <Sector
            cx={cx}
            cy={cy}
            startAngle={startAngle}
            endAngle={endAngle}
            innerRadius={outerRadius + 6}
            outerRadius={outerRadius + 10}
            fill={fill}
          />
          <path
            d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
            stroke={fill}
            fill="none"
          />
          <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
          <text
            x={ex + (cos >= 0 ? 1 : -1) * 12}
            y={ey}
            textAnchor={textAnchor}
            fill="#333"
          >{`Ratio ${value}`}</text>
          <text
            x={ex + (cos >= 0 ? 1 : -1) * 12}
            y={ey}
            dy={18}
            textAnchor={textAnchor}
            fill="#999"
          >
            {`(Rate ${(percent * 100).toFixed(2)}%)`}
          </text>
        </g>
      );
    }; 

const ProductInfo = () =>{   

    const [activeIndex, setActiveIndex] = useState(0);
    const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
    );

    return(
        <>  
        <SideBar />
            <div className="product-info">
                <p id="text-heading">Product details</p>
                <hr />
                <div className="pdct-information">
                    <p id="product-name">
                        Integrated Chips
                    </p>
                    <hr />
                    <div className="particular-item-detail">
                        <ul>
                            <li>Product ID : </li>
                            <li>45TBC89</li>
                        </ul>
                        <ul>
                            <li>Expiry : </li>
                            <li>450 Days</li>
                        </ul>
                        <ul>
                            <li>Status : </li>
                            <li>In-stock</li>
                        </ul>
                        <ul>
                            <li>Quantity : </li>
                            <li>765</li>
                        </ul>
                        <ul>
                            <li>Location : </li>
                            <li>Warehouse 3, Batch 8</li>
                        </ul>
                    </div>
                    <hr />
                </div>
                <div className="product-chart">
                    <p>Stock available Vs Expiry period</p>
                    <div className="pie-chart">
                        <PieChart width={400} height={400}>
      <Pie
        activeIndex={activeIndex}
        activeShape={renderActiveShape}
        data={data}
        cx={180}
        cy={120}
        innerRadius={60}
        outerRadius={80}
        fill="rgba(50, 220, 250,0.5)"
        dataKey="value"
        onMouseEnter={onPieEnter}
      />
    </PieChart>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductInfo;