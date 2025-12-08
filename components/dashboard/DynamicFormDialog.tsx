'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
} from '@/components/ui/drawer';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { RichTextEditor } from './rich-text-editor';
import { useIsMobile } from '@/hooks/use-mobile';
import { X, Plus, ImageIcon } from 'lucide-react';

export type FieldType = 'text' | 'textarea' | 'richtext' | 'date' | 'switch' | 'images' | 'url';

export interface FormFieldConfig {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  required?: boolean;
  defaultValue?: unknown;
}

interface DynamicFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  fields: FormFieldConfig[];
  initialData?: Record<string, unknown>;
  onSubmit: (data: Record<string, unknown>) => void;
  isLoading?: boolean;
  mode: 'add' | 'edit';
}

const createDynamicSchema = (fields: FormFieldConfig[]) => {
  const shape: Record<string, z.ZodTypeAny> = {};
  
  fields.forEach((field) => {
    let fieldSchema: z.ZodTypeAny;
    
    switch (field.type) {
      case 'switch':
        fieldSchema = z.boolean();
        break;
      case 'images':
        fieldSchema = z.array(z.string()).optional();
        break;
      case 'date':
        fieldSchema = field.required 
          ? z.string().min(1, `${field.label} مطلوب`)
          : z.string().optional();
        break;
      case 'url':
        fieldSchema = field.required
          ? z.string().url('رابط غير صالح').min(1, `${field.label} مطلوب`)
          : z.string().refine(
              (val) => !val || val === '' || z.string().url().safeParse(val).success,
              { message: 'رابط غير صالح' }
            ).optional().or(z.literal(''));
        break;
      default:
        fieldSchema = field.required 
          ? z.string().min(1, `${field.label} مطلوب`)
          : z.string().optional();
    }
    
    shape[field.name] = fieldSchema;
  });
  
  return z.object(shape);
};

export const DynamicFormDialog = ({
  open,
  onOpenChange,
  title,
  fields,
  initialData,
  onSubmit,
  isLoading = false,
  mode,
}: DynamicFormDialogProps) => {
  const isMobile = useIsMobile();
  const [imageInputs, setImageInputs] = useState<string[]>(['']);

  const schema = createDynamicSchema(fields);
  
  const getDefaultValues = () => {
    const defaults: Record<string, unknown> = {};
    fields.forEach((field) => {
      if (initialData && initialData[field.name] !== undefined) {
        // Convert null values to empty string or appropriate default
        const value = initialData[field.name];
        if (value === null) {
          switch (field.type) {
            case 'switch':
              defaults[field.name] = false;
              break;
            case 'images':
              defaults[field.name] = [];
              break;
            case 'date':
              // Default to today's date if null
              defaults[field.name] = new Date().toISOString().split('T')[0];
              break;
            default:
              defaults[field.name] = '';
          }
        } else {
          // Handle date formatting for date inputs
          if (field.type === 'date' && value) {
            // Convert ISO date string to YYYY-MM-DD format for date input
            const date = new Date(value);
            defaults[field.name] = date.toISOString().split('T')[0];
          } else {
            defaults[field.name] = value;
          }
        }
      } else if (field.defaultValue !== undefined) {
        defaults[field.name] = field.defaultValue;
      } else {
        switch (field.type) {
          case 'switch':
            defaults[field.name] = false;
            break;
          case 'images':
            defaults[field.name] = [];
            break;
          case 'date':
            // Default to today's date
            defaults[field.name] = new Date().toISOString().split('T')[0];
            break;
          default:
            defaults[field.name] = '';
        }
      }
    });
    return defaults;
  };

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: getDefaultValues(),
  });

  useEffect(() => {
    if (open) {
      const defaults = getDefaultValues();
      form.reset(defaults);
      
      const imagesField = fields.find(f => f.type === 'images');
      if (imagesField && initialData?.[imagesField.name]?.length > 0) {
        setImageInputs([...initialData[imagesField.name], '']);
      } else {
        setImageInputs(['']);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, initialData]);

  const handleSubmit = (data: Record<string, unknown>) => {
    const imagesField = fields.find(f => f.type === 'images');
    if (imagesField) {
      data[imagesField.name] = imageInputs.filter(img => img.trim() !== '');
    }
    onSubmit(data);
  };

  const addImageInput = () => {
    setImageInputs([...imageInputs, '']);
  };

  const removeImageInput = (index: number) => {
    const newInputs = imageInputs.filter((_, i) => i !== index);
    if (newInputs.length === 0) newInputs.push('');
    setImageInputs(newInputs);
  };

  const updateImageInput = (index: number, value: string) => {
    const newInputs = [...imageInputs];
    newInputs[index] = value;
    setImageInputs(newInputs);
  };

  const renderField = (fieldConfig: FormFieldConfig) => {
    const { name, label, type, placeholder } = fieldConfig;

    if (type === 'images') {
      return (
        <div key={name} className="space-y-2">
          <FormLabel>{label}</FormLabel>
          <div className="space-y-2">
            {imageInputs.map((img, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  placeholder={placeholder || 'رابط الصورة'}
                  value={img}
                  onChange={(e) => updateImageInput(index, e.target.value)}
                  dir="ltr"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeImageInput(index)}
                  disabled={imageInputs.length === 1 && !img}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" size="sm" onClick={addImageInput}>
              <Plus className="h-4 w-4 ml-2" />
              إضافة صورة
            </Button>
          </div>
        </div>
      );
    }

    return (
      <FormField
        key={name}
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              {type === 'textarea' ? (
                <Textarea
                  placeholder={placeholder}
                  {...field}
                  className="min-h-[100px]"
                  dir="rtl"
                />
              ) : type === 'richtext' ? (
                <RichTextEditor
                  value={field.value || ''}
                  onChange={field.onChange}
                  placeholder={placeholder}
                />
              ) : type === 'switch' ? (
                <div className="flex items-center gap-2">
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <span className="text-sm text-muted-foreground">
                    {field.value ? 'نشر' : 'حفظ بدون نشر' }
                  </span>
                </div>
              ) : type === 'date' ? (
                <Input
                  type="date"
                  {...field}
                  value={field.value || ''}
                  dir="ltr"
                />
              ) : type === 'url' ? (
                <Input
                  type="url"
                  placeholder={placeholder}
                  {...field}
                  value={field.value || ''}
                  dir="ltr"
                />
              ) : (
                <Input
                  placeholder={placeholder}
                  {...field}
                  value={field.value || ''}
                />
              )}
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  };

  const formContent = (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <div className="grid gap-4 max-h-[60vh] overflow-y-auto px-1">
          {fields.map(renderField)}
        </div>
        <div className="flex gap-2 justify-end pt-4">
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            إلغاء
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'جاري الحفظ...' : mode === 'add' ? 'إضافة' : 'حفظ التعديلات'}
          </Button>
        </div>
      </form>
    </Form>
  );

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="max-h-[90vh]">
          <DrawerHeader>
            <DrawerTitle>{title}</DrawerTitle>
          </DrawerHeader>
          <div className="px-4 pb-4">
            {formContent}
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {formContent}
      </DialogContent>
    </Dialog>
  );
};
