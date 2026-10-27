#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/39dc4656cd867a8ae1faf8150b9828093e60e24e777a9d940ab90be142b7bc7c/contract';
import endContract from '../../snapshots/39dc4656cd867a8ae1faf8150b9828093e60e24e777a9d940ab90be142b7bc7c/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/763924af2791342869f9ea977039adc729ce4df7c93eb7c764025231710d9237/contract';
import startContract from '../../snapshots/763924af2791342869f9ea977039adc729ce4df7c93eb7c764025231710d9237/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, sql } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.dropNotNull({ schema: 'public', table: 'Author', column: 'updated_at' }),
      this.dropNotNull({ schema: 'public', table: 'Song', column: 'updated_at' }),
      this.addColumnWithTemporaryDefault({
        schema: 'public',
        table: 'Song',
        column: 'release_date',
        type: 'date',
        temporaryDefault: sql`'epoch'`,
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
