
const NextButton = ({ onClick, label = "Next Stage", disabled = false, }) => (
  <div>

    <button
      onClick={onClick}
      disabled={disabled}
      className={`
  border border-[var(--button-border)]
  bg-[var(--button-bg)]
  text-[14px]
  font-medium
  px-2 py-1
  rounded-lg
  transition cursor-pointer
  hover:bg-[var(--button-hover-bg)]
`}

    >
      {label}
    </button>
  </div>

);

export default NextButton;
