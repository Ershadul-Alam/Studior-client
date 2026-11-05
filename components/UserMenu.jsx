const UserMenu = () => (
    <div className="flex items-center gap-3">
        <a
            href="/sign-in"
            className="inline-flex items-center justify-center rounded-full border border-white/20 px-5 py-3 text-[15px] font-semibold text-white transition hover:bg-white/10"
        >
            Sign in
        </a>
        <a
            href="/sign-up"
            className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-[15px] font-semibold text-neutral-900 shadow-lg transition hover:bg-neutral-200"
        >
            Sign up
        </a>
    </div>
);

export default UserMenu;