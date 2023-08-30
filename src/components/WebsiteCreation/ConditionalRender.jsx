function ConditionalRender({ hidden, children }) {
  if (hidden) {
    return null;
  }
  return children;
}

export default ConditionalRender;
