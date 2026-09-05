type OgImageProps = {
  title: string;
  subtitle?: string;
};

const TITLE_SIZE_BY_LENGTH = [
  { upTo: 22, size: 100 },
  { upTo: 38, size: 82 },
  { upTo: 55, size: 68 },
] as const;

function titleSize(length: number): number {
  return TITLE_SIZE_BY_LENGTH.find((step) => length <= step.upTo)?.size ?? 56;
}

export function OgImage({ title, subtitle }: OgImageProps) {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#ffffff",
        padding: "100px",
        fontFamily: "Berkeley Mono",
      }}
    >
      <div
        style={{
          display: "flex",
          maxWidth: "1000px",
          fontSize: titleSize(title.length),
          fontWeight: 700,
          color: "#1a1a17",
          lineHeight: 1.15,
          textAlign: "center",
        }}
      >
        {title}
      </div>
      {subtitle ? (
        <div
          style={{
            marginTop: "32px",
            fontSize: "28px",
            fontWeight: 400,
            color: "#9b9b90",
            textAlign: "center",
          }}
        >
          {subtitle}
        </div>
      ) : null}
    </div>
  );
}
