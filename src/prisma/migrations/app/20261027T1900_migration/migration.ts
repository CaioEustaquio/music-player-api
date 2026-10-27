#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/39dc4656cd867a8ae1faf8150b9828093e60e24e777a9d940ab90be142b7bc7c/contract';
import startContract from '../../snapshots/39dc4656cd867a8ae1faf8150b9828093e60e24e777a9d940ab90be142b7bc7c/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/abdb0b5acc58e9a82346f3eb1b077da8a7336ece1c543c0a4a41c40d36f08180/contract';
import endContract from '../../snapshots/abdb0b5acc58e9a82346f3eb1b077da8a7336ece1c543c0a4a41c40d36f08180/contract.json' with { type: 'json' };
import { Migration, MigrationCLI } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [];
  }
}

MigrationCLI.run(import.meta.url, M);
