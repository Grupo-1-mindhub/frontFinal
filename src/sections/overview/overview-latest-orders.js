import { format } from 'date-fns';
import PropTypes from 'prop-types';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { SeverityPill } from 'src/components/severity-pill';

const statusMap = {
  pending: 'warning',
  delivered: 'success',
  refunded: 'error'
};
const categoriesMap=[
  "GENERAL",
  "FOOD",
  "ENTERTAINMENT",
  "SERVICES",
  "SUPERMARKET",
  "TRANSPORT"
];

export const OverviewLatestOrders = (props) => {
  const { orders = [], sx } = props;

  return (
    <Card sx={sx}>
      <CardHeader title="Transactions History" />
      <Scrollbar sx={{ flexGrow: 1 }}>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Amount
                </TableCell>
                <TableCell>
                  Description
                </TableCell>
                <TableCell>
                  Category
                </TableCell>
                <TableCell sortDirection="desc">
                  Date
                </TableCell>
                
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => {
                const createdAt = format(new Date(order.creationDate), 'yyyy/MM/dd');

                return (
                  <TableRow
                    hover
                    key={order.id}
                  >
                    <TableCell>
                      ${order.amount}
                    </TableCell>
                    <TableCell>
                      {order.description}
                    </TableCell>
                    <TableCell>
                      {categoriesMap[order.category]}
                    </TableCell>
                    <TableCell>
                      {createdAt}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button
          color="inherit"
          endIcon={(
            <SvgIcon fontSize="small">
              <ArrowRightIcon />
            </SvgIcon>
          )}
          size="small"
          variant="text"
        >
          View all {/* este boton que lleve a la parte de TRANSACTIONS o sacarlo*/}
        </Button>
      </CardActions>
    </Card>
  );
};

OverviewLatestOrders.prototype = {
  orders: PropTypes.array,
  sx: PropTypes.object
};
