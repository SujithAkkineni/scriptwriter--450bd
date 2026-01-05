'use client';

import React, { useState, useContext } from 'react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarInset,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import Header from '@/components/layout/header';
import ScriptEditor from '@/components/features/script-editor';
import AiAnalysisPanel from '@/components/features/ai-analysis-panel';
import { Button } from '@/components/ui/button';
import {
  FileText,
  Users,
  Clapperboard,
  Sparkles,
  Download,
  Upload,
  Settings,
  Menu,
  Plus,
  FilePlus,
  Trash2,
  MapPin,
} from 'lucide-react';
import { Input } from '../ui/input';
import { FontContext } from '@/context/font-context';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ClientOnly from './client-only';

const initialScriptContent = `[SCENE START]

INT. COFFEE SHOP - DAY

Sunlight streams through the large window of a bustling city cafe. ANNA (30s), dressed in a sharp business suit, types furiously on her laptop. A half-empty cup of coffee sits beside her.

A WAITER (20s) approaches her table.

WAITER
Another coffee, ma'am?

ANNA
(Without looking up)
Yes, please. Black.

The waiter nods and walks away. Anna sighs, rubbing her temples. Her phone buzzes. It's a call from "DAVID". She ignores it.

Suddenly, a man, MARK (30s), handsome and disheveled, stumbles into the coffee shop. He looks panicked. He spots Anna and rushes to her table.

MARK
Anna! Thank God I found you.

Anna looks up, annoyed.

ANNA
Mark! What are you doing here? I'm working.

MARK
(Leaning in, whispering)
They know. They know everything. We have to go. Now.

Anna's eyes widen in fear. She quickly shuts her laptop.

ANNA
What are you talking about? Who knows?

MARK
There's no time to explain.

He grabs her arm.

EXT. PARK - NIGHT

The park is dimly lit by street lamps. Anna and Mark run through the shadows, looking over their shoulders.

ANNA
We can't keep running forever.

MARK
Just a little longer. I know a safe place.

They disappear into the darkness.

INT. OFFICE - DAY

A sterile office building. Anna sits at a desk, staring at a computer screen. Her phone rings.

ANNA
(into phone)
Hello?

VOICE (O.S.)
It's time to come in.

Anna hangs up, looking worried.

EXT. STREET - EVENING

Rain falls on the city street. Anna walks alone, umbrella in hand. She stops, looking back at the office building in the distance.

ANNA
(to herself)
What have I gotten into?

FADE OUT.

[SCENE END]`;

export default function AppShell() {
  const [scriptContent, setScriptContent] = useState(initialScriptContent);
  const [activeTool, setActiveTool] = useState<'nav' | 'ai' | 'format' | 'media' | 'settings'>('nav');
  const [scenes, setScenes] = useState<string[]>(['INT. COFFEE SHOP - DAY', 'EXT. PARK - NIGHT', 'INT. OFFICE - DAY', 'EXT. STREET - EVENING']);
  const [characters, setCharacters] = useState<string[]>(['ANNA', 'WAITER', 'MARK']);
  const [places, setPlaces] = useState<string[]>(['COFFEE SHOP']);
  const [cursorPosition, setCursorPosition] = useState<{start: number, end: number} | null>(null);
  const { font } = useContext(FontContext);

  const toolConfig = {
    nav: { icon: Menu, label: 'Navigation' },
    ai: { icon: Sparkles, label: 'AI Tools' },
    format: { icon: Download, label: 'Formatting' },
    media: { icon: Upload, label: 'Media' },
    settings: { icon: Settings, label: 'Settings' },
  };

  const ActiveToolIcon = toolConfig[activeTool].icon;

  const handleNewWorkspace = () => {
    // For now, we'll just clear the script content.
    // In a real app, this would involve more complex logic
    // like creating a new document, updating state, etc.
    setScriptContent('');
  };
  
  const handleNewProject = () => {
    // This will clear the script and the outline
    setScriptContent('');
    setScenes([]);
    setCharacters([]);
  };

  const addCharacter = (name: string) => {
    const upperName = name.toUpperCase();
    if (upperName && !characters.includes(upperName)) {
      setCharacters([...characters, upperName]);
    }
  };

  const addScene = (name: string) => {
    if (name && !scenes.includes(name)) {
      setScenes([...scenes, name]);
    }
  }

  const deleteCharacter = (name: string) => {
    setCharacters(characters.filter((c) => c !== name));
  };

  const deleteScene = (name: string) => {
    setScenes(scenes.filter((s) => s !== name));
  };

  const addPlace = (name: string) => {
    if (name && !places.includes(name)) {
      setPlaces([...places, name]);
    }
  };

  const deletePlace = (name: string) => {
    setPlaces(places.filter((p) => p !== name));
  };

  const jumpToScene = (scene: string) => {
    const lines = scriptContent.split('\n');
    const lineIndex = lines.findIndex(line => line.trim() === scene || line.includes(scene));
    if (lineIndex !== -1) {
      const start = scriptContent.indexOf(lines[lineIndex]);
      const end = start + lines[lineIndex].length;
      setCursorPosition({ start, end });
    }
  };

  const jumpToCharacter = (character: string) => {
    const lines = scriptContent.split('\n');
    const lineIndex = lines.findIndex(line => line.trim() === character || line.trim().startsWith(character + ':') || line.includes(character));
    if (lineIndex !== -1) {
      const start = scriptContent.indexOf(lines[lineIndex]);
      const end = start + lines[lineIndex].length;
      setCursorPosition({ start, end });
    }
  };

  const jumpToPlace = (place: string) => {
    const lines = scriptContent.split('\n');
    const lineIndex = lines.findIndex(line => line.includes(place));
    if (lineIndex !== -1) {
      const start = scriptContent.indexOf(lines[lineIndex]);
      const end = start + lines[lineIndex].length;
      setCursorPosition({ start, end });
    }
  };

  return (
    <ClientOnly>
      <div>
        <SidebarProvider>
          <SidebarInset className="flex flex-col">
            <Header />
            <main className="flex-1 overflow-auto p-4 md:p-6">
              <ScriptEditor value={scriptContent} onChange={setScriptContent} characters={characters} scenes={scenes} cursorPosition={cursorPosition} />
            </main>
          </SidebarInset>

          <Sidebar side="right" collapsible="icon" className="p-0">
            <SidebarHeader className="p-2">
              <div className="flex h-10 items-center justify-between p-2">
                <div className='flex items-center gap-2'>
                  <ActiveToolIcon className="size-5" />
                  <span className="text-lg font-semibold">{toolConfig[activeTool].label}</span>
                </div>
                <div className="flex items-center justify-center rounded-lg bg-muted p-1">
                  {Object.entries(toolConfig).filter(([key]) => key !== 'settings').map(([key, { icon: Icon }]) => (
                    <Button
                      key={key}
                      variant={activeTool === key ? 'default' : 'ghost'}
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setActiveTool(key as any)}
                      aria-label={toolConfig[key as keyof typeof toolConfig].label}
                    >
                      <Icon className="h-5 w-5" />
                    </Button>
                  ))}
                </div>
              </div>
            </SidebarHeader>
            <SidebarSeparator />
            <SidebarContent className="p-4">
              {activeTool === 'nav' && <NavPanel scenes={scenes} characters={characters} places={places} onAddCharacter={addCharacter} onAddScene={addScene} onAddPlace={addPlace} onDeleteCharacter={deleteCharacter} onDeleteScene={deleteScene} onDeletePlace={deletePlace} onJumpToScene={jumpToScene} onJumpToCharacter={jumpToCharacter} onJumpToPlace={jumpToPlace} />}
              {activeTool === 'ai' && <AiAnalysisPanel scriptContent={scriptContent} />}
              {activeTool === 'format' && <FormatPanel scriptContent={scriptContent} />}
              {activeTool === 'media' && <MediaPanel />}
              {activeTool === 'settings' && <SettingsPanel />}
            </SidebarContent>
            <SidebarFooter>
              <Button variant="ghost" className="w-full justify-start gap-2" onClick={handleNewWorkspace}>
                <Plus className="size-4" />
                <span>New</span>
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-2" onClick={handleNewProject}>
                <FilePlus className="size-4" />
                <span>New Project</span>
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-2" onClick={() => setActiveTool('settings')}>
                <Settings className="size-4" />
                <span>Settings</span>
              </Button>
            </SidebarFooter>
          </Sidebar>
        </SidebarProvider>
      </div>
    </ClientOnly>
  );
}

const NavPanel = ({ scenes, characters, places, onAddScene, onAddCharacter, onAddPlace, onDeleteScene, onDeleteCharacter, onDeletePlace, onJumpToScene, onJumpToCharacter, onJumpToPlace }: { scenes: string[], characters: string[], places: string[], onAddScene: (name: string) => void, onAddCharacter: (name: string) => void, onAddPlace: (name: string) => void, onDeleteScene: (name: string) => void, onDeleteCharacter: (name: string) => void, onDeletePlace: (name: string) => void, onJumpToScene: (scene: string) => void, onJumpToCharacter: (character: string) => void, onJumpToPlace: (place: string) => void }) => {
    const [newScene, setNewScene] = useState('');
    const [newCharacter, setNewCharacter] = useState('');
    const [newPlace, setNewPlace] = useState('');
    const [selectedItem, setSelectedItem] = useState<string | null>(null);

    const handleAddScene = (e: React.FormEvent) => {
        e.preventDefault();
        if (newScene.trim()) {
            onAddScene(newScene.trim());
            setNewScene('');
        }
    };

    const handleAddCharacter = (e: React.FormEvent) => {
        e.preventDefault();
        if (newCharacter.trim()) {
            onAddCharacter(newCharacter.trim());
            setNewCharacter('');
        }
    };

    const handleAddPlace = (e: React.FormEvent) => {
        e.preventDefault();
        if (newPlace.trim()) {
            onAddPlace(newPlace.trim());
            setNewPlace('');
        }
    };

    return (
        <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-lg">Project Outline</h3>
            <ul className="space-y-1">
                <li><Button variant="ghost" className="w-full justify-start gap-2 text-base"><FileText className="size-4 text-muted-foreground"/> Script</Button></li>
                <li>
                    <p className="px-3 pt-2 pb-1 text-sm font-semibold text-muted-foreground flex justify-between items-center">
                        Scenes
                    </p>
                    <form onSubmit={handleAddScene} className="flex gap-2 p-2">
                        <Input value={newScene} onChange={(e) => setNewScene(e.target.value)} placeholder="New Scene" className="h-8"/>
                        <Button type="submit" size="icon" className="h-8 w-8 shrink-0"><Plus className="size-4" /></Button>
                    </form>
                    {scenes.length > 0 ? (
                        <ul className="space-y-1 pl-4">
                            {scenes.map((scene, index) => (
                                <li key={index} className="flex items-center group">
                                  <Button variant={selectedItem === `scene-${scene}` ? "secondary" : "ghost"} className="w-full justify-start gap-2" onClick={() => { setSelectedItem(`scene-${scene}`); onJumpToScene(scene); }}>
                                    <Clapperboard className="size-4 text-muted-foreground"/> {scene}
                                  </Button>
                                  {selectedItem === `scene-${scene}` && (
                                    <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0" onClick={() => onDeleteScene(scene)}>
                                      <Trash2 className="size-4 text-destructive"/>
                                    </Button>
                                  )}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="px-4 py-2 text-sm text-muted-foreground">Add a scene to get started.</div>
                    )}
                </li>
                <li>
                    <p className="px-3 pt-2 pb-1 text-sm font-semibold text-muted-foreground flex justify-between items-center">
                        Characters
                    </p>
                    <form onSubmit={handleAddCharacter} className="flex gap-2 p-2">
                        <Input value={newCharacter} onChange={(e) => setNewCharacter(e.target.value)} placeholder="New Character" className="h-8"/>
                        <Button type="submit" size="icon" className="h-8 w-8 shrink-0"><Plus className="size-4" /></Button>
                    </form>
                     {characters.length > 0 ? (
                        <ul className="space-y-1 pl-4">
                            {characters.map((character, index) => (
                               <li key={index} className="flex items-center group">
                                 <Button variant={selectedItem === `character-${character}` ? "secondary" : "ghost"} className="w-full justify-start gap-2" onClick={() => { setSelectedItem(`character-${character}`); onJumpToCharacter(character); }}>
                                   <Users className="size-4 text-muted-foreground"/> {character}
                                 </Button>
                                  {selectedItem === `character-${character}` && (
                                    <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0" onClick={() => onDeleteCharacter(character)}>
                                      <Trash2 className="size-4 text-destructive"/>
                                    </Button>
                                  )}
                               </li>
                            ))}
                        </ul>
                    ) : (
                         <div className="px-4 py-2 text-sm text-muted-foreground">Add a character to get started.</div>
                    )}
                </li>
                <li>
                    <p className="px-3 pt-2 pb-1 text-sm font-semibold text-muted-foreground flex justify-between items-center">
                        Places
                    </p>
                    <form onSubmit={handleAddPlace} className="flex gap-2 p-2">
                        <Input value={newPlace} onChange={(e) => setNewPlace(e.target.value)} placeholder="New Place" className="h-8"/>
                        <Button type="submit" size="icon" className="h-8 w-8 shrink-0"><Plus className="size-4" /></Button>
                    </form>
                     {places.length > 0 ? (
                        <ul className="space-y-1 pl-4">
                            {places.map((place, index) => (
                               <li key={index} className="flex items-center group">
                                 <Button variant={selectedItem === `place-${place}` ? "secondary" : "ghost"} className="w-full justify-start gap-2" onClick={() => { setSelectedItem(`place-${place}`); onJumpToPlace(place); }}>
                                   <MapPin className="size-4 text-muted-foreground"/> {place}
                                 </Button>
                                  {selectedItem === `place-${place}` && (
                                    <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0" onClick={() => onDeletePlace(place)}>
                                      <Trash2 className="size-4 text-destructive"/>
                                    </Button>
                                  )}
                               </li>
                            ))}
                        </ul>
                    ) : (
                         <div className="px-4 py-2 text-sm text-muted-foreground">Add a place to get started.</div>
                    )}
                </li>
            </ul>
        </div>
    );
};


const FormatPanel = ({ scriptContent }: { scriptContent: string }) => {
    const handleDownload = (format: string) => {
        const blob = new Blob([scriptContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `script.${format}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="flex flex-col gap-6">
            <div>
                <h3 className="font-semibold text-lg">Formatting</h3>
                <p className="text-sm text-muted-foreground">Adjust your script's appearance.</p>
            </div>
            <div className="flex flex-col gap-4">
                <h3 className="font-semibold text-lg">Export Script</h3>
                <div className="flex flex-col gap-2">
                    <Button onClick={() => handleDownload('txt')}><Download className="mr-2 size-4"/> Download as Text (.txt)</Button>
                    <Button variant="secondary" onClick={() => handleDownload('fdx')}><Download className="mr-2 size-4"/> Final Draft (.fdx)</Button>
                    <Button variant="secondary" onClick={() => handleDownload('celtx')}><Download className="mr-2 size-4"/> Celtx (.celtx)</Button>
                    <Button variant="secondary" onClick={() => handleDownload('fountain')}><Download className="mr-2 size-4"/> Fountain (.fountain)</Button>
                </div>
            </div>
        </div>
    );
};


const MediaPanel = () => (
  <div className="flex flex-col gap-4">
    <h3 className="font-semibold text-lg">Media Assets</h3>
    <Button variant="outline">
      <Upload className="mr-2 size-4" /> Upload Media
    </Button>
    <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed border-border p-8 text-center">
      <p className="text-sm text-muted-foreground">Drop files here or click to upload</p>
    </div>
  </div>
);

const SettingsPanel = () => {
    const { font, setFont } = useContext(FontContext);
    
    return (
        <div className="flex flex-col gap-6">
            <div>
                <h3 className="font-semibold text-lg">Settings</h3>
                <p className="text-sm text-muted-foreground">Customize your editor experience.</p>
            </div>
            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Font Family</label>
                <Select value={font} onValueChange={setFont}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a font" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="font-inter">Inter</SelectItem>
                        <SelectItem value="font-roboto">Roboto</SelectItem>
                        <SelectItem value="font-lato">Lato</SelectItem>
                        <SelectItem value="font-source-serif">Source Serif</SelectItem>
                        <SelectItem value="font-courier-new">Courier New</SelectItem>
                        <SelectItem value="font-courier-prime">Courier Prime</SelectItem>
                        <SelectItem value="font-noto-sans">Noto Sans</SelectItem>
                        <SelectItem value="font-open-sans">Open Sans</SelectItem>
                        <SelectItem value="font-merriweather">Merriweather</SelectItem>
                        <SelectItem value="font-inconsolata">Inconsolata</SelectItem>
                        <SelectItem value="font-playfair-display">Playfair Display</SelectItem>
                        <SelectItem value="font-montserrat">Montserrat</SelectItem>
                        <SelectItem value="font-pt-serif">PT Serif</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
};
