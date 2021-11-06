const React = require("react");

const IndexPage = (props) => {
  return (
    <div>
      Hello {props.name} {props.surname}. You are {props.age} years old.
    </div>
  );
};

module.exports = IndexPage;
