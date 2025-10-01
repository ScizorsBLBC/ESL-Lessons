#!/usr/bin/env python3

import os
import re
import json as json_module
from collections import defaultdict
from docx import Document

def extract_text_from_docx(file_path):
    """Extract text content from a docx file"""
    try:
        doc = Document(file_path)
        text = []
        for paragraph in doc.paragraphs:
            if paragraph.text.strip():
                text.append(paragraph.text.strip())
        return '\n'.join(text)
    except Exception as e:
        print(f"Error reading {file_path}: {e}")
        return ""

def parse_filename(filename):
    """Parse filename to extract level and clean slug"""
    # Remove .docx extension and "Lvl X " prefix, "_ Breaking News English" suffix
    clean_name = re.sub(r'^Lvl \d+\s*', '', filename.replace('.docx', ''))
    clean_name = re.sub(r'\s*_\s*Breaking News English.*$', '', clean_name)
    # Convert to slug format
    slug = re.sub(r'[^a-zA-Z0-9\s-]', '', clean_name).lower().strip()
    slug = re.sub(r'\s+', '-', slug)
    return slug

def parse_level_content(full_text, level):
    """Parse article content and separate homework sections"""
    if not full_text:
        return '', '', '', ''

    # Look for "Homework:" section
    homework_index = full_text.find('Homework:')
    if homework_index == -1:
        return full_text.strip(), '', '', ''

    # Split at "Homework:" - everything before is article text
    article_text = full_text[:homework_index].strip()

    # Get content after "Homework:"
    after_homework = full_text[homework_index + len('Homework:'):].strip()

    # For Level 6, look for writing prompts
    if level == 6:
        return parse_level_6_content(article_text, after_homework)

    # For Level 1 and Level 3, extract questions and instruction
    return parse_level_1_and_3_content(article_text, after_homework)

def parse_level_6_content(article_text, after_homework):
    """Parse Level 6 content which includes writing prompts"""
    # Look for actual writing prompt sections
    writing_prompt_markers = ['Free Writing', 'Academic Writing', 'Writing Practice', 'writing practice']
    writing_index = -1

    for marker in writing_prompt_markers:
        index = after_homework.lower().find(marker.lower())
        if index != -1:
            writing_index = index
            break

    if writing_index != -1:
        # Split at the writing prompt section
        before_writing = after_homework[:writing_index].strip()
        writing_prompt = after_homework[writing_index:].strip()

        # Extract instruction and questions from before writing
        instruction, questions = extract_instruction_and_questions(before_writing)

        return article_text, instruction, questions, writing_prompt

    # If no writing prompt section found, check if there's just questions
    instruction, questions = extract_instruction_and_questions(after_homework)

    return article_text, instruction, questions, ''

def parse_level_1_and_3_content(article_text, after_homework):
    """Parse Level 1 and Level 3 content"""
    instruction, questions = extract_instruction_and_questions(after_homework)

    return article_text, instruction, questions, ''

def extract_instruction_and_questions(homework_content):
    """Extract instruction and questions from homework content"""
    instruction_markers = ['Write a full sentence', 'Write a full-sentence', 'Answer each question', 'Write full sentences', 'In your Vocab Notebook']
    instruction = ''
    questions = homework_content

    for marker in instruction_markers:
        index = homework_content.lower().find(marker.lower())
        if index != -1:
            lines = homework_content.split('\n')
            instruction_found = False

            for i, line in enumerate(lines):
                if marker.lower() in line.lower():
                    instruction = line.strip()
                    questions = '\n'.join(lines[i + 1:]).strip()
                    instruction_found = True
                    break

            if instruction_found:
                break

    return instruction, questions

def parse_article_content(text):
    """Parse article text to extract headline, body, and questions"""
    lines = text.split('\n')

    # First line is usually the headline
    headline = lines[0].strip() if lines else ""

    # Find where questions start (numbered questions)
    question_start = -1
    for i, line in enumerate(lines):
        if re.match(r'^\d+\.', line.strip()):
            question_start = i
            break

    if question_start == -1:
        # No questions found, treat all as body text
        return headline, '\n'.join(lines[1:]), ""

    body_text = '\n'.join(lines[1:question_start]).strip()
    questions_text = '\n'.join(lines[question_start:]).strip()

    return headline, body_text, questions_text

def main():
    folder_path = "Breaking news articles"

    # Group files by article (they share the same base name)
    articles = defaultdict(lambda: {})

    for filename in os.listdir(folder_path):
        if not filename.endswith('.docx'):
            continue

        file_path = os.path.join(folder_path, filename)
        level_match = re.search(r'^Lvl (\d+)', filename)

        if not level_match:
            print(f"Skipping file {filename} - no level found")
            continue

        level = int(level_match.group(1))
        slug = parse_filename(filename)

        # Extract text from docx
        text = extract_text_from_docx(file_path)
        if not text:
            continue

        # Parse content with proper homework separation
        article_text, instruction, questions, writing_prompt = parse_level_content(text, level)

        # Store by slug (article identifier)
        articles[slug][f'level_{level}'] = {
            'headline': text.split('\n')[0].strip() if text else "",  # Extract headline from first line
            'article_text': article_text,
            'instruction': instruction,
            'questions': questions,
            'writing_prompt': writing_prompt,
            'filename': filename
        }

        print(f"Processed {filename} -> {slug} (Level {level})")

    # Generate JavaScript data structure
    js_data = []
    article_id = 1

    for slug, levels in articles.items():
        # Use whatever levels are available
        level1 = levels.get('level_1')
        level3 = levels.get('level_3')
        level6 = levels.get('level_6')

        # Create the data structure with properly parsed content
        article_data = {
            'id': f'rec{article_id:03d}',
            'fields': {
                'Headline': level3['headline'] if level3 else (level1['headline'] if level1 else (level6['headline'] if level6 else '')),
                'Slug': slug,
                'Image URL': '',
                'Level 0 Text': '',
                'Level 0 Questions': '',
                'Level 1 Text': level1['article_text'] if level1 else '',
                'Level 1 Questions': level1['questions'] if level1 else '',
                'Level 1 Instruction': level1['instruction'] if level1 else '',
                'Level 2 Text': '',
                'Level 2 Questions': '',
                'Level 3 Text': level3['article_text'] if level3 else '',
                'Level 3 Questions': level3['questions'] if level3 else '',
                'Level 3 Instruction': level3['instruction'] if level3 else '',
                'Level 4 Text': '',
                'Level 4 Questions': '',
                'Level 5 Text': '',
                'Level 5 Questions': '',
                'Level 6 Text': level6['article_text'] if level6 else '',
                'Level 6 Questions': level6['questions'] if level6 else '',
                'Level 6 Instruction': level6['instruction'] if level6 else '',
                'Level 6 Writing Prompt': level6['writing_prompt'] if level6 else ''
            }
        }

        js_data.append(article_data)
        article_id += 1

        print(f"Added article: {slug}")

    # Write to newsData.js
    with open('src/data/newsData.js', 'w', encoding='utf-8') as f:
        f.write('export const newsData = [\n')
        for i, article in enumerate(js_data):
            f.write('  {\n')
            f.write(f'    id: \'{article["id"]}\',\n')
            f.write('    fields: {\n')
            for key, value in article['fields'].items():
                # Use JSON encoding for proper escaping
                json_value = json_module.dumps(value)
                f.write(f'      "{key}": {json_value},\n')
            f.write('    }\n')
            f.write('  },\n' if i < len(js_data) - 1 else '  }\n')
        f.write('];\n')

    print(f"\n✅ Successfully processed {len(js_data)} articles into src/data/newsData.js")

if __name__ == "__main__":
    main()
