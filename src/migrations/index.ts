import * as migration_20260117_083222 from './20260117_083222'
import * as migration_20260117_133652 from './20260117_133652'
import * as migration_20260117_140132 from './20260117_140132'

export const migrations = [
  {
    up: migration_20260117_083222.up,
    down: migration_20260117_083222.down,
    name: '20260117_083222',
  },
  {
    up: migration_20260117_133652.up,
    down: migration_20260117_133652.down,
    name: '20260117_133652',
  },
  {
    up: migration_20260117_140132.up,
    down: migration_20260117_140132.down,
    name: '20260117_140132',
  },
]
