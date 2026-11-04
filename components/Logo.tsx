export default function Logo() {
  return (
    <a href="/" className="inline-flex items-center gap-2.5 text-white">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        className="size-7"
      >
        <path d="M16.5 4.5H9.5a3 3 0 0 0 0 6h5a3 3 0 0 1 0 6H7" />
      </svg>
      <span className="text-[27px] font-extrabold tracking-tight">Studiro</span>
    </a>
  );
}
