#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/763924af2791342869f9ea977039adc729ce4df7c93eb7c764025231710d9237/contract';
import endContract from '../../snapshots/763924af2791342869f9ea977039adc729ce4df7c93eb7c764025231710d9237/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, fn, primaryKey, sql } from '@prisma/orm-postgres/migration';

export default class M extends Migration<never, End> {
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createSchema({ schema: 'public' }),
      this.createTable({
        schema: 'public',
        table: 'Author',
        columns: [
          col('created_at', 'timestamptz', {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
          col('id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('image_url', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('updated_at', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'Song',
        columns: [
          col('created_at', 'timestamptz', {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
          col('duration', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('file_url', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('thumbnail_image_url', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('title', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('updated_at', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'SongsAuthors',
        columns: [
          col('author_id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('song_id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
        ],
        constraints: [primaryKey(['author_id', 'song_id'])],
      }),
      this.addUnique({
        schema: 'public',
        table: 'Author',
        constraint: 'Author_name_key',
        columns: ['name'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'Song',
        constraint: 'Song_title_key',
        columns: ['title'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'SongsAuthors',
        index: 'SongsAuthors_author_id_idx_f3862461',
        columns: ['author_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'SongsAuthors',
        index: 'SongsAuthors_song_id_idx_2e2805d0',
        columns: ['song_id'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'SongsAuthors',
        foreignKey: {
          name: 'SongsAuthors_author_id_fkey',
          columns: ['author_id'],
          references: { schema: 'public', table: 'Author', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'SongsAuthors',
        foreignKey: {
          name: 'SongsAuthors_song_id_fkey',
          columns: ['song_id'],
          references: { schema: 'public', table: 'Song', columns: ['id'] },
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
