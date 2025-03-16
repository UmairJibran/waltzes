export function Video(props: {
  path: string;
  captions: string;
  width: number;
  height: number;
  controls: boolean;
  preload?: 'none' | 'metadata' | 'auto';
  loop?: boolean;
  muted?: boolean;
  autoPlay?: boolean;
  poster?: string;
  className?: string;
  srcLang?: string;
  label?: string;
}) {
  const {
    path,
    captions,
    width,
    height,
    controls,
    preload,
    loop,
    muted,
    autoPlay,
    poster,
    className,
    srcLang,
    label,
  } = props;
  return (
    <video
      width={width}
      height={height}
      controls={controls}
      preload={preload}
      loop={loop}
      muted={muted}
      autoPlay={autoPlay}
      poster={poster}
      className={className}
    >
      <source src={path} type="video/mp4" />
      <track src={captions} kind="subtitles" srcLang={srcLang} label={label} />
      Your browser does not support the video tag.
    </video>
  );
}
