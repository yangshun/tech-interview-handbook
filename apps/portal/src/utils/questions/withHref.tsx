const withHref = <Props extends Record<string, unknown>>(
  Component: React.ComponentType<Props>,
) => {
  return (
    props: Props & {
      href: string;
    },
  ) => {
    const { href, ...others } = props;

    return (
      <a
        className="ring-primary-500 rounded-md focus:ring-2 focus-visible:outline-none active:bg-slate-100"
        href={href}>
        <Component {...(others as unknown as Props)} />
      </a>
    );
  };
};

export default withHref;
