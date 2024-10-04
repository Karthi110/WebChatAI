ALTER TABLE "chat" RENAME COLUMN "url_id" TO "url";--> statement-breakpoint
ALTER TABLE "indexedUrls" DROP CONSTRAINT "indexedUrls_id_unique";--> statement-breakpoint
ALTER TABLE "chat" DROP CONSTRAINT "chat_url_id_indexedUrls_id_fk";
--> statement-breakpoint
ALTER TABLE "chat" ALTER COLUMN "url" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "indexedUrls" ALTER COLUMN "id" SET DATA TYPE serial;--> statement-breakpoint
ALTER TABLE "indexedUrls" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "chat" ADD CONSTRAINT "chat_url_indexedUrls_url_fk" FOREIGN KEY ("url") REFERENCES "public"."indexedUrls"("url") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
