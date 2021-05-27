import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { useSelector } from 'react-redux';
import { MAX_DATA_LENGTH } from '../../utils/constants';
import priceFormatter from '../../utils/priceFormatter';

const Graph = ({}) => {
  const bitcoinData = useSelector(
    (state: { bitcoinSlice }) => state.bitcoinSlice.bitcoinData
  );
  const domain = useSelector(
    (state: { bitcoinSlice }) => state.bitcoinSlice.domain
  );
  return (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart data={bitcoinData}>
        <defs>
          <linearGradient
            id="graph-area-gradient"
            x1="0"
            y1="0"
            x2="0"
            y2="100%"
          >
            <stop offset="0%" stopColor="rgba(252, 193, 23, .2)" />
            <stop offset="80%" stopColor="rgba(252, 193, 23, 0)" />
          </linearGradient>
        </defs>
        <Area
          dataKey="price"
          stroke="#F89413"
          fill="url(#graph-area-gradient)"
        />
        <XAxis
          dataKey="time"
          axisLine={false}
          tickLine={false}
          tickCount={MAX_DATA_LENGTH}
        />
        <YAxis
          dataKey="price"
          axisLine={false}
          tickLine={false}
          tickCount={MAX_DATA_LENGTH}
          domain={domain}
          tickFormatter={(value) => priceFormatter(value, { noDecimal: true })}
        />
        <Tooltip />
        <CartesianGrid opacity={0.2} vertical={false} />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default Graph;
