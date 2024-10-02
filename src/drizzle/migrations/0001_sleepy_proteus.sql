ALTER TABLE "indexedUrls" ALTER COLUMN "url" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "indexedUrls" ADD CONSTRAINT "indexedUrls_id_unique" UNIQUE("id");--> statement-breakpoint
ALTER TABLE "indexedUrls" ADD CONSTRAINT "indexedUrls_url_unique" UNIQUE("url");--> statement-breakpoint
ALTER TABLE "message" ADD CONSTRAINT "message_id_unique" UNIQUE("id");--> statement-breakpoint
ALTER TABLE "messages" ADD CONSTRAINT "messages_id_unique" UNIQUE("id");--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_id_unique" UNIQUE("id");--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_email_unique" UNIQUE("email");