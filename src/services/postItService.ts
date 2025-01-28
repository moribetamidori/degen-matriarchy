import { createClient } from '@/lib/supabase/client';
import { Database } from '../../supabase/database.types';

type Page = Database['public']['Tables']['pages']['Row'];
type Note = Database['public']['Tables']['post_it_notes']['Row'];

export async function getPages(): Promise<Page[]> {
  const supabase = createClient();
  
  // Log the URL and key being used (mask the key partially)
  console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
  console.log('Using Anon Key:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.substring(0, 10) + '...');
  
  const { data, error } = await supabase
    .from('pages')
    .select('*')
    .order('number', { ascending: true });

  if (error) {
    // Enhanced error logging
    console.error('Supabase error details:', {
      message: error.message,
      code: error.code,
      details: error.details,
      hint: error.hint
    });
    throw error;
  }

  // Log the response
  console.log('Raw response:', data);
  return data;
}

export async function createPage(number: number): Promise<Page> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('pages')
    .insert({ number })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getNotesByPage(pageId: string): Promise<Note[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('post_it_notes')
    .select('*')
    .eq('page_id', pageId);

  if (error) throw error;
  return data;
}

export async function createNote(note: Omit<Note, 'id' | 'created_at' | 'updated_at'>): Promise<Note> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('post_it_notes')
    .insert(note)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateNotePosition(
  id: string,
  position_x: number,
  position_y: number
): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase
    .from('post_it_notes')
    .update({ 
      position_x, 
      position_y,
      updated_at: new Date().toISOString()
    })
    .eq('id', id);

  if (error) throw error;
}