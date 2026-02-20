const legendItems = [
  { key: "STOP", label: "販売停止", className: "dot--red" },
  { key: "DANGER", label: "警告2以上", className: "dot--orange" },
  { key: "WARNING", label: "警告1", className: "dot--yellow" },
  { key: "UNCHECKED", label: "確認未完了", className: "dot--gray" },
  { key: "OK", label: "正常", className: "dot--green" }
];

export function StatusLegend() {
  return (
    <div className="legend">
      {legendItems.map((item) => (
        <div className="legend__item" key={item.key}>
          <span className={`dot ${item.className}`} />
          {item.label}
        </div>
      ))}
    </div>
  );
}
