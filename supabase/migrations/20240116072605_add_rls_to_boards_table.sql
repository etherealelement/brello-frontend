create policy "Enable insert for authenticated users only"
on "public"."boards"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable read access for authenticated author"
on "public"."boards"
as permissive
for select
to authenticated
using ((auth.uid() = author_id));


create policy "Enable update for authenticated author"
on "public"."boards"
as permissive
for update
to authenticated
using ((auth.uid() = author_id))
with check ((auth.uid() = author_id));



