const TestButton = () => {
  const handleClick = () => {
    console.log("Test button clicked");
  };
  return <button onClick={handleClick}>TestButton</button>;
};

export default TestButton;
