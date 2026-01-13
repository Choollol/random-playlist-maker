import { authClient } from "@/lib/authClient";

const TestButton = () => {
  const handleClick = async () => {
    console.log("Test button clicked");

    console.log(await authClient.accountInfo());
  };
  return (
    <>
      <button onClick={handleClick}>TestButton</button>
    </>
  );
};

export default TestButton;
