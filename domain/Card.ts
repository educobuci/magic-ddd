export const Colors = {
  White: 'W',
  Blue: 'U',
  Black: 'B',
  Red: 'R',
  Green: 'G',
} as const

export type Colors = (typeof Colors)[keyof typeof Colors]

export type ManaType = 'W' | 'U' | 'B' | 'R' | 'G' | 'C' | 'X' | 'P' | 'S'
export type HybridMana = [ManaType, ManaType]
export type ManaCost = ManaType | HybridMana | number

export const Supertype = {
  Basic: 'Basic',
  Legendary: 'Legendary',
  Snow: 'Snow',
  World: 'World',
} as const

export type Supertype = (typeof Supertype)[keyof typeof Supertype]

export const PermanentType = {
  Artifact: 'Artifact',
  Creature: 'Creature',
  Enchantment: 'Enchantment',
  Land: 'Land',
  Planeswalker: 'Planeswalker',
} as const

export type PermanentType = (typeof PermanentType)[keyof typeof PermanentType]

export const NonPermanentType = {
  Instant: 'Instant',
  Sorcery: 'Sorcery',
} as const

export type NonPermanentType =
  (typeof NonPermanentType)[keyof typeof NonPermanentType]

export type CardType = PermanentType | NonPermanentType

export type BaseCard<T extends CardType> = {
  name: string
  cardType: T

  color?: Colors[] | undefined
  colorIndicator?: Colors[] | undefined
  manaCost?: ManaCost | ManaCost[]
  rulesText?: string | undefined
  subtype?: string[] | undefined
  supertype?: Supertype | undefined
}

export type PlaneswalkerCard = BaseCard<typeof PermanentType.Planeswalker> & {
  loyalty?: number | undefined
}

export type InstantCard = BaseCard<typeof NonPermanentType.Instant> & {}

export type ArtifactCard = BaseCard<typeof PermanentType.Artifact>
export type CreatureCard = BaseCard<typeof PermanentType.Creature>
export type EnchantmentCard = BaseCard<typeof PermanentType.Enchantment>
export type LandCard = BaseCard<typeof PermanentType.Land>
export type SorceryCard = BaseCard<typeof NonPermanentType.Sorcery>

export type Card =
  | ArtifactCard
  | CreatureCard
  | EnchantmentCard
  | InstantCard
  | LandCard
  | PlaneswalkerCard
  | SorceryCard
