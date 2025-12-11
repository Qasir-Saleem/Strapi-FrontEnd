/**
 * @typedef {Object} LinkProps
 * @property {number} id
 * @property {string} text
 * @property {string} href
 * @property {boolean} isExternal
 */

/**
 * @typedef {Object} ImageProps
 * @property {number} id
 * @property {string} documentId
 * @property {string} url
 * @property {string} alternativeText
 */

/**
 * @typedef {Object} LogoProps
 * @property {string} logoText
 * @property {ImageProps} image
 */

/**
 * @typedef {"blocks.hero-section" | "blocks.info-block"} ComponentType
 */

/**
 * @typedef {Object} Base
 * @property {number} id
 * @property {ComponentType} [__component]
 * @property {string} [documentId]
 * @property {string} [createdAt]
 * @property {string} [updatedAt]
 * @property {string} [publishedAt]
 * @property {Object} [data]
 */

/**
 * @typedef {Object} HeroSectionProps
 * @property {number} id
 * @property {"blocks.hero-section"} [__component]
 * @property {string} [documentId]
 * @property {string} [createdAt]
 * @property {string} [updatedAt]
 * @property {string} [publishedAt]
 * @property {("turquoise" | "orange")} theme
 * @property {string} heading
 * @property {ImageProps} image
 * @property {LinkProps} [cta]
 * @property {LogoProps} [logo]
 * @property {string} [author]
 * @property {boolean} [darken]
 */

/**
 * @typedef {Object} InfoBlockProps
 * @property {number} id
 * @property {"blocks.info-block"} [__component]
 * @property {string} [documentId]
 * @property {string} [createdAt]
 * @property {string} [updatedAt]
 * @property {string} [publishedAt]
 * @property {("turquoise" | "orange")} theme
 * @property {boolean} [reversed]
 * @property {string} headline
 * @property {string} content
 * @property {ImageProps} image
 * @property {LinkProps} [cta]
 */

/**
 * @typedef {HeroSectionProps | InfoBlockProps} Block
 */

// Example usage:
// /** @type {HeroSectionProps} */
// const hero = { ... };
