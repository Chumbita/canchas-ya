import "./StatusToggle.css";

export default function StatusToggle({ isActive, onToggle }) {
  return (
    <label className="toggle-switch">
      <input
        type="checkbox"
        checked={isActive}
        onChange={(e) => onToggle(e.target.checked)}
      />
      <span className="slider"></span>
    </label>
  );
}
