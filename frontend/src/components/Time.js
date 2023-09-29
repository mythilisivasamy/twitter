import { parseISO, format } from 'date-fns';
const Time = ({ timeStamp }) => {
  let date='';
  if (timeStamp) {
    date = format(parseISO(timeStamp), 'yyyy/MM/dd');
  }
  return (
    <span className="small">
      &nbsp;<i>{date} </i>
    </span>
  );
};
export default Time;
