const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const {createClient} = require("@supabase/supabase-js");

const dotenv = require("dotenv");
const app = express();

app.use(cors());
app.use(bodyParser.json());


dotenv.config();
const PORT = 5000;

const SUPABASE_URL = 'https://oqcfbchjsdaqmgsvxhmz.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xY2ZiY2hqc2RhcW1nc3Z4aG16Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ1NDQ0NjEsImV4cCI6MjA1MDEyMDQ2MX0.W6wQ70heFnq8__K6uZ8wpoLisKYK0lcqU8OLB1H2hTk';

 supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

app.post("/api/tickets", async (req, res) => {
  const { user_id, ticket_id, title, desc, category, priority_level } = req.body;

  try {
    const { data, error } = await supabase
      .from("tickets")
      .insert([
        {
          user_id: '2b6aa0f6-59cd-43d7-bfa5-5a7843dad1ff',
          title,
          desc,
          category,
          priority_level,
          status: "Open",
          created_at: new Date(),
        },
      ])
      .select();

    if (error) throw error;

    res.status(201).json({ success: true, ticket: data[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});


app.put(`/api/tickets/:${ticket_id}`, async (req, res) => {
  const { ticket_id } = req.params;
  const { status, title, desc, category, priority_level } = req.body;

  try {
    const updateData = {
      ...(status && { status }),
      ...(title && { title }),
      ...(desc && { desc }),
      ...(category && { category }),
      ...(priority_level && { priority_level }),
      updated_at: new Date(),
    };

    const { data, error } = await supabase
      .from("tickets")
      .update(updateData)
      .eq("ticket_id", ticket_id)
      .select();

    if (error) throw error;

    res.status(200).json({ success: true, ticket: data[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});


app.get("/api/tickets/:ticket_id", async (req, res) => {
  const { ticket_id } = req.params;

  try {
    const { data, error } = await supabase
      .from("tickets")
      .select("ticket_id, user_id, status, created_at, updated_at, title, desc, category, priority_level")
      .eq("ticket_id", ticket_id)
      .single();

    if (error) throw error;

    res.status(200).json({ success: true, ticket: data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});


app.get("/api/tickets/user/:user_id", async (req, res) => {
  const { user_id } = req.params;

  try {
    const { data, error } = await supabase
      .from("tickets")
      .select("ticket_id, title, status, created_at, updated_at, category, priority_level")
      .eq("user_id", user_id);

    if (error) throw error;

    res.status(200).json({ success: true, tickets: data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});


app.get("/api/tickets", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("tickets")
      .select("ticket_id, user_id, title, status, created_at, updated_at, category, priority_level");

    if (error) throw error;

    res.status(200).json({ success: true, tickets: data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
