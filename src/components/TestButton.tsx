import { ENV } from "@/env";

interface Props {
  url: string;
}

const TestButton = ({ url }: Props) => {
  const handleClick = () => {
    console.log("Test button clicked");
    console.log(url);
  };
  return <button onClick={handleClick}>TestButton</button>;
};

export default TestButton;
