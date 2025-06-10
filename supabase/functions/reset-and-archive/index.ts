// // Define interfaces
// interface Participant {
//   id: string;
//   full_name: string;
//   has_registered: boolean;
//   has_checked_in: boolean;
//   has_checked_out: boolean;
//   reason: string | null;
// }

// interface AttendanceHistoryRecord {
//   participant_id: string;
//   full_name: string;
//   attended_on: string;
//   reason: string | null;
//   was_registered: boolean;
//   was_checked_in: boolean;
//   was_checked_out: boolean;
// }

// import { serve } from 'https://deno.land/std/http/server.ts';
// import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// serve(async (req) => {
//   if (req.method !== 'POST') {
//     return new Response('Method Not Allowed', { status: 405 });
//   }

//  const supabaseUrl = Deno.env.get('SUPABASE_URL');
// const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

//   if (!supabaseUrl || !serviceRoleKey) {
//     return new Response('Missing Supabase env vars', { status: 500 });
//   }

//   const supabase = createClient(supabaseUrl, serviceRoleKey);

//   // 1. Get all participants
//   const { data: participants, error: fetchError } = await supabase
//     .from('participants')
//     .select('*');

//   if (fetchError || !participants) {
//     console.error('Fetch error:', fetchError);
//     return new Response('Failed to fetch participants', { status: 500 });
//   }

//   if (participants.length === 0) {
//     return new Response('No participants to archive.', { status: 200 });
//   }

//   // 2. Prepare archive records
//   const archivePayload: AttendanceHistoryRecord[] = participants.map((p) => ({
//     participant_id: p.id,
//     full_name: p.full_name,
//     attended_on: new Date().toISOString(),
//     reason: p.reason,
//     was_registered: p.has_registered,
//     was_checked_in: p.has_checked_in,
//     was_checked_out: p.has_checked_out,
//   }));

//   const { error: insertError } = await supabase
//     .from('attendance_history')
//     .insert(archivePayload);

//   if (insertError) {
//     console.error('Insert error:', insertError);
//     return new Response('Failed to archive data', { status: 500 });
//   }

//   // 3. Reset participants
//   const { error: resetError } = await supabase
//     .from('participants')
//     .update({
//       has_registered: false,
//       has_checked_in: false,
//       has_checked_out: false,
//       reason: null,
//     });

//   if (resetError) {
//     console.error('Reset error:', resetError);
//     return new Response('Failed to reset participants', { status: 500 });
//   }

//   return new Response('Weekly reset and archive successful!', { status: 200 });
// });
