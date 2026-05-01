// Skill data configuration file
// Used to manage data for the skill display page
const skillModules = import.meta.glob('@/content/skills/*.json', { eager: true });

export interface Skill {
    id: string;
    name: string;
    description: string;
    icon: string; // Iconify icon name
    category: "ai" | "backend" | "client" | "frontend" | "database" | "engines" | "tools" | "others"
      | "music_tool" | "music_instrument" | "language" | "os_platform" | "cloud"
      | "game_engine" | "graphics_physics" | "graphics" | "physics" | "gui"
      | "doc_diagram" | "doc" | "diagram" | "ssg"
      | "terminal" | "shell" | "editor_ide" | "misc"
      | "game_full_stack" | "game_server" | "game_client";

    level: "beginner" | "intermediate" | "advanced" | "expert";
    experience: {
        years: number;
        months: number;
    };
    projects?: string[]; // Related project IDs
    certifications?: string[];
    color?: string; // Skill card theme color
    basePath?: string;
}

export const skillsData: Skill[] = Object.entries(skillModules).map(([path, mod]: [string, any]) => {
  const id = path.split('/').pop()?.replace('.json', '') || '';
  const data = mod.default;
  const basePath = path.replace('../', '').replace(/\/[^/]+$/, '');
  return { id, ...data, basePath } as Skill;
});

// Get skill statistics
export const getSkillStats = () => {
    const total = skillsData.length;
    const byLevel = {
        beginner: skillsData.filter((s) => s.level === "beginner").length,
        intermediate: skillsData.filter((s) => s.level === "intermediate").length,
        advanced: skillsData.filter((s) => s.level === "advanced").length,
        expert: skillsData.filter((s) => s.level === "expert").length,
    };
    const byCategory = {
        /*
        ai: skillsData.filter((s) => s.category === "ai").length,
        backend: skillsData.filter((s) => s.category === "backend").length,
        client: skillsData.filter((s) => s.category === "client").length,
        frontend: skillsData.filter((s) => s.category === "frontend").length,
        database: skillsData.filter((s) => s.category === "database").length,
        tools: skillsData.filter((s) => s.category === "tools").length,
        engines: skillsData.filter((s) => s.category === "engines").length,
        others: skillsData.filter((s) => s.category === "others").length,
        */

        music_instrument: skillsData.filter((s) => s.category === "music_instrument").length,
        music_tool: skillsData.filter((s) => s.category === "music_tool").length,
        ai: skillsData.filter((s) => s.category === "ai").length,
        language: skillsData.filter((s) => s.category === "language").length,
        database: skillsData.filter((s) => s.category === "database").length,
        os_platform: skillsData.filter((s) => s.category === "os_platform").length,
        cloud: skillsData.filter((s) => s.category === "cloud").length,
        game_engine: skillsData.filter((s) => s.category === "game_engine").length,
        graphics_physics: skillsData.filter((s) => s.category === "graphics_physics").length,
        // graphics: skillsData.filter((s) => s.category === "graphics").length,
        // physics: skillsData.filter((s) => s.category === "physics").length,
        gui: skillsData.filter((s) => s.category === "gui").length,
        doc_diagram: skillsData.filter((s) => s.category === "doc_diagram").length,
        // doc: skillsData.filter((s) => s.category === "doc").length,
        // diagram: skillsData.filter((s) => s.category === "diagram").length,
        ssg: skillsData.filter((s) => s.category === "ssg").length,
        terminal: skillsData.filter((s) => s.category === "terminal").length,
        shell: skillsData.filter((s) => s.category === "shell").length,
        editor_ide: skillsData.filter((s) => s.category === "editor_ide").length,
        misc: skillsData.filter((s) => s.category === "misc").length,
        // game_full_stack: skillsData.filter((s) => s.category === "game_full_stack").length,
        // game_server: skillsData.filter((s) => s.category === "game_server").length,
        // game_client: skillsData.filter((s) => s.category === "game_client").length,
    };
    return { total, byLevel, byCategory };
};


// Get skills by category
export const getSkillsByCategory = (category?: string) => {
    if (!category || category === "all") {
        return skillsData;
    }
    return skillsData.filter((s) => s.category === category);
};


// Get advanced skills
export const getAdvancedSkills = () => {
    return skillsData.filter(
        (s) => s.level === "advanced" || s.level === "expert",
    );
};


// Calculate total years of experience
export const getTotalExperience = () => {
    const totalMonths = skillsData.reduce((total, skill) => {
        return total + skill.experience.years * 12 + skill.experience.months;
    }, 0);
    return {
        years: Math.floor(totalMonths / 12),
        months: totalMonths % 12,
    };
};