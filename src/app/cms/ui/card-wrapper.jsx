export const CardWrapper = ({ children }) => {
  return (
    <div className="fd-border-1 shadow-sm rounded">
      <div className="p-4">{children}</div>
    </div>
  );
};
