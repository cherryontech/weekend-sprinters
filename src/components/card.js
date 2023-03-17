import styles from '@/styles/Results.module.css'

function Card({imgUrl, imgAlt, cardTitle, cardTag, cardUrl, cardDesc}) {

  return (
    <div className={styles.card}>
      <picture className={styles.card_image}>
        <source srcSet={imgUrl.join('')} type="image/webp" />
        <img
          src={imgUrl.join('')}
          alt={imgAlt}
          width={250}
        />
      </picture>

      <section className={styles.card_text}>
        <div className={styles.card_title}>
          <h2>{cardTitle}</h2>
          <p className={styles.tag}>{cardTag}</p>
        </div>

        <div>
          <p>{cardDesc}</p>
        </div>

        <div className={styles.card_redirect}>
          <a href={cardUrl.join('')} rel="noreferrer" target="_blank" className={[styles.card_resource_a, styles.tag].join(" ")}>Learn more</a>
        </div>
      </section>
    </div>
  )
}

export default Card;
