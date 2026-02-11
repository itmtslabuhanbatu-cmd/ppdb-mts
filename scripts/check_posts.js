
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = "https://rsnmzxenibishhcmtxph.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJzbm16eGVuaWJpc2hoY210eHBoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk1OTMxMjAsImV4cCI6MjA4NTE2OTEyMH0.inJV9Tr3p1rr0PK_3P7yzNg7_LDoHdVbJlF7YnqGFWY";

if (!supabaseUrl || !supabaseKey) {
    console.error("Missing env vars");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
    console.log("Fetching all posts...");
    const { data: posts, error } = await supabase.from('posts').select('*');
    if (error) {
        console.error("Error fetching posts:", error);
        return;
    }
    console.log(`Found ${posts.length} posts.`);
    posts.forEach(p => console.log(`- ${p.title} (ID: ${p.id})`));

    if (posts.length > 0) {
        const firstId = posts[0].id;
        console.log(`Attempting to fetch single post with ID: ${firstId}`);
        const { data: post, error: singleError } = await supabase
            .from('posts')
            .select('*')
            .eq('id', firstId)
            .single();

        if (singleError) {
            console.error("Error fetching single post:", singleError);
        } else {
            console.log("Successfully fetched single post:", post.title);
        }
    }
}

check();
