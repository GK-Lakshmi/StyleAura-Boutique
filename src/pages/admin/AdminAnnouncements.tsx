
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, Pencil, Plus, Trash } from "lucide-react";

type Announcement = {
  id: string;
  message: string;
  url?: string;
  isActive: boolean;
  startDate: Date;
  endDate: Date;
};

const mockAnnouncements: Announcement[] = [
  {
    id: "ann-1",
    message: "Summer Sale! Use code SUMMER20 for 20% off.",
    url: "/products/category/sale",
    isActive: true,
    startDate: new Date("2025-05-01"),
    endDate: new Date("2025-08-31"),
  },
  {
    id: "ann-2",
    message: "New Arrivals: Check out our latest collection!",
    url: "/products/category/new-arrivals",
    isActive: true,
    startDate: new Date("2025-05-15"),
    endDate: new Date("2025-09-31"),
  },
  {
    id: "ann-3",
    message: "Winter Collection Coming Soon",
    url: "/products/category/winter",
    isActive: false,
    startDate: new Date("2025-06-01"),
    endDate: new Date("2025-10-31"),
  },
];

const AdminAnnouncements: React.FC = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>(mockAnnouncements);
  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  
  const [newAnnouncement, setNewAnnouncement] = useState<Partial<Announcement>>({
    message: "",
    url: "",
    isActive: true,
    startDate: new Date(),
    endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
  });

  const handleCreate = () => {
    const id = `ann-${Date.now()}`;
    const createdAnnouncement = {
      ...newAnnouncement,
      id,
    } as Announcement;
    
    setAnnouncements([...announcements, createdAnnouncement]);
    setNewAnnouncement({
      message: "",
      url: "",
      isActive: true,
      startDate: new Date(),
      endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
    });
    setIsCreateDialogOpen(false);
    
    toast.success("Announcement created successfully");
  };

  const handleUpdate = () => {
    if (!editingAnnouncement) return;
    
    const updatedAnnouncements = announcements.map((ann) =>
      ann.id === editingAnnouncement.id ? editingAnnouncement : ann
    );
    
    setAnnouncements(updatedAnnouncements);
    setEditingAnnouncement(null);
    
    toast.success("Announcement updated successfully");
  };

  const handleDelete = (id: string) => {
    const filteredAnnouncements = announcements.filter((ann) => ann.id !== id);
    setAnnouncements(filteredAnnouncements);
    
    toast.success("Announcement deleted successfully");
  };

  const toggleStatus = (id: string) => {
    const updatedAnnouncements = announcements.map((ann) =>
      ann.id === id ? { ...ann, isActive: !ann.isActive } : ann
    );
    
    setAnnouncements(updatedAnnouncements);
    
    const announcement = updatedAnnouncements.find((ann) => ann.id === id);
    toast.success(`Announcement ${announcement?.isActive ? "activated" : "deactivated"}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Manage Announcements</h1>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-aura-purple hover:bg-aura-dark-purple">
              <Plus className="mr-2 h-4 w-4" />
              Add Announcement
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Announcement</DialogTitle>
              <DialogDescription>
                Create a new announcement to display on your website.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Enter announcement message"
                  value={newAnnouncement.message}
                  onChange={(e) => setNewAnnouncement({ ...newAnnouncement, message: e.target.value })}
                  className="resize-none"
                />
              </div>
              <div>
                <Label htmlFor="url">URL (Optional)</Label>
                <Input
                  id="url"
                  placeholder="/products/category/sale"
                  value={newAnnouncement.url || ""}
                  onChange={(e) => setNewAnnouncement({ ...newAnnouncement, url: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="start-date">Start Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !newAnnouncement.startDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {newAnnouncement.startDate ? format(newAnnouncement.startDate, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 pointer-events-auto">
                      <Calendar
                        mode="single"
                        selected={newAnnouncement.startDate}
                        onSelect={(date) => setNewAnnouncement({ ...newAnnouncement, startDate: date || new Date() })}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <Label htmlFor="end-date">End Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !newAnnouncement.endDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {newAnnouncement.endDate ? format(newAnnouncement.endDate, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 pointer-events-auto">
                      <Calendar
                        mode="single"
                        selected={newAnnouncement.endDate}
                        onSelect={(date) => setNewAnnouncement({ ...newAnnouncement, endDate: date || new Date() })}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="active"
                  checked={newAnnouncement.isActive}
                  onCheckedChange={(checked) => setNewAnnouncement({ ...newAnnouncement, isActive: checked })}
                />
                <Label htmlFor="active">Active</Label>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleCreate}
                disabled={!newAnnouncement.message}
                className="bg-aura-purple hover:bg-aura-dark-purple"
              >
                Create
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Announcements</CardTitle>
          <CardDescription>
            Manage the announcements that appear on your website.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Message</TableHead>
                <TableHead>URL</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {announcements.map((announcement) => (
                <TableRow key={announcement.id}>
                  <TableCell className="font-medium">{announcement.message}</TableCell>
                  <TableCell>{announcement.url || "-"}</TableCell>
                  <TableCell>{format(new Date(announcement.startDate), "MMM d, yyyy")}</TableCell>
                  <TableCell>{format(new Date(announcement.endDate), "MMM d, yyyy")}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id={`status-${announcement.id}`}
                        checked={announcement.isActive}
                        onCheckedChange={() => toggleStatus(announcement.id)}
                      />
                      <Label htmlFor={`status-${announcement.id}`} className="ml-2">
                        {announcement.isActive ? "Active" : "Inactive"}
                      </Label>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Dialog
                        open={editingAnnouncement?.id === announcement.id}
                        onOpenChange={(open) => {
                          if (!open) setEditingAnnouncement(null);
                        }}
                      >
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setEditingAnnouncement(announcement)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                          <DialogHeader>
                            <DialogTitle>Edit Announcement</DialogTitle>
                            <DialogDescription>
                              Update the details of this announcement.
                            </DialogDescription>
                          </DialogHeader>
                          {editingAnnouncement && (
                            <div className="grid gap-4 py-4">
                              <div>
                                <Label htmlFor="edit-message">Message</Label>
                                <Textarea
                                  id="edit-message"
                                  placeholder="Enter announcement message"
                                  value={editingAnnouncement.message}
                                  onChange={(e) =>
                                    setEditingAnnouncement({
                                      ...editingAnnouncement,
                                      message: e.target.value,
                                    })
                                  }
                                  className="resize-none"
                                />
                              </div>
                              <div>
                                <Label htmlFor="edit-url">URL (Optional)</Label>
                                <Input
                                  id="edit-url"
                                  placeholder="/products/category/sale"
                                  value={editingAnnouncement.url || ""}
                                  onChange={(e) =>
                                    setEditingAnnouncement({
                                      ...editingAnnouncement,
                                      url: e.target.value,
                                    })
                                  }
                                />
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label>Start Date</Label>
                                  <Popover>
                                    <PopoverTrigger asChild>
                                      <Button
                                        variant="outline"
                                        className={cn(
                                          "w-full justify-start text-left font-normal"
                                        )}
                                      >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {format(new Date(editingAnnouncement.startDate), "PPP")}
                                      </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0 pointer-events-auto">
                                      <Calendar
                                        mode="single"
                                        selected={new Date(editingAnnouncement.startDate)}
                                        onSelect={(date) =>
                                          setEditingAnnouncement({
                                            ...editingAnnouncement,
                                            startDate: date || new Date(),
                                          })
                                        }
                                        initialFocus
                                      />
                                    </PopoverContent>
                                  </Popover>
                                </div>
                                <div>
                                  <Label>End Date</Label>
                                  <Popover>
                                    <PopoverTrigger asChild>
                                      <Button
                                        variant="outline"
                                        className={cn(
                                          "w-full justify-start text-left font-normal"
                                        )}
                                      >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {format(new Date(editingAnnouncement.endDate), "PPP")}
                                      </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0 pointer-events-auto">
                                      <Calendar
                                        mode="single"
                                        selected={new Date(editingAnnouncement.endDate)}
                                        onSelect={(date) =>
                                          setEditingAnnouncement({
                                            ...editingAnnouncement,
                                            endDate: date || new Date(),
                                          })
                                        }
                                        initialFocus
                                      />
                                    </PopoverContent>
                                  </Popover>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Switch
                                  id="edit-active"
                                  checked={editingAnnouncement.isActive}
                                  onCheckedChange={(checked) =>
                                    setEditingAnnouncement({
                                      ...editingAnnouncement,
                                      isActive: checked,
                                    })
                                  }
                                />
                                <Label htmlFor="edit-active">Active</Label>
                              </div>
                            </div>
                          )}
                          <DialogFooter>
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => setEditingAnnouncement(null)}
                            >
                              Cancel
                            </Button>
                            <Button
                              onClick={handleUpdate}
                              disabled={!editingAnnouncement?.message}
                              className="bg-aura-purple hover:bg-aura-dark-purple"
                            >
                              Save Changes
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="icon" className="text-red-500">
                            <Trash className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete the
                              announcement.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(announcement.id)}
                              className="bg-red-500 text-white hover:bg-red-600"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {announcements.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-6">
                    No announcements found. Create your first one!
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminAnnouncements;
