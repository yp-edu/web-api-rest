import * as migration_20260117_083222 from './20260117_083222'

export const migrations = [
  {
    up: migration_20260117_083222.up,
    down: migration_20260117_083222.down,
    name: '20260117_083222',
  },
]
