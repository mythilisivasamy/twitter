//import { format } from 'date-fns';
const Time = ({ timeStamp }) => {
  let date = timeStamp.substring(0, timeStamp.indexOf('T'));

  return (
    <span>
      &nbsp;<i>{date} </i>
    </span>
  );
};
export default Time;
