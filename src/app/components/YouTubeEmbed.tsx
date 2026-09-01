import styles from './YouTubeEmbed.module.css'

type Props = {
  videoId: string
  title: string
  className?: string
}

export default function YouTubeEmbed({ videoId, title, className }: Props) {
  return (
    <div className={[styles.wrap, className].filter(Boolean).join(' ')}>
      <iframe
        className={styles.frame}
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
  )
}
