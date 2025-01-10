interface TotalProps {
  total: number;
}

const Total = (props: TotalProps) => {
  return <p>Number of exercises {props.total}</p>;
};

export default Total;
